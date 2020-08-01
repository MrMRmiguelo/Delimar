const Producto = require("../models/productmodel");
const passport = require("passport");
const Usuario = require("../models/usuario");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const crypto = require("crypto");
const enviarCorreo  = require("../helpers/email");
const bcrypt = require("bcrypt-nodejs");

// Verificar si el usuario se puede autenticar con sus credenciales
exports.autenticarUsuario = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/iniciar_sesion",
    badRequestMessage: "Debes ingresar tu usuario y/o tu contraseña",
    failureFlash: true,
    
  });

    // Verificar si el usuario está autenticado o no // Sesion middleware
exports.usuarioAutenticado = (req, res, next) => {
  // Si el usuario está autenticado que continúe con la petición
  if (req.isAuthenticated()) {
    return next();
  }
  // Si el usuario no está autenticado, iniciar sesión
  return res.redirect("/iniciar_sesion");
};


// 

exports.home = (req, res, next) => {
    res.render("paginaPrincipal");
};

exports.prueba = (req, res, next) => {
    res.send("Prueba");
};


exports.lista = (req, res, next) => {
     res.render("lista");
};
exports.success = (req, res, next) => {
  res.render("success");
};
exports.cancel = (req, res, next) => {
  res.render("cancel");
};

exports.compra = (req, res, next) => {
  res.render("compra");
};


// Cerrar la sesión del usuario actual
exports.cerrarSesion = (req, res, next) => {
  // Al cerrar sesión redirigimos al usuario al inicio de sesión
  req.session.destroy(() => {
    res.redirect("/iniciar_sesion");
  });
};

  //Generar token para Reestablecer contraseña
  exports.enviarToken = async (req, res, next) => {
    // Verificar si existe el usuario
    const { email } = req.body;
    const usuario = await Usuario.findOne({
      where: {
        email,
      },
    });
  
    // Si el usuario no existe
    if (!usuario) {
      req.flash("error", "¡Este usuario no está registrado en Taskily!");
      res.redirect("/reestablecer_contrasena");
    }
  
    // Si el usuario existe
    // Generar un token único con una fecha de expiración
    usuario.token = crypto.randomBytes(20).toString("hex");
    usuario.expiration = Date.now() + 3600000;
  
  
    // Guardar el token y la fecha de validez
    await usuario.save();
  
    // URL de reestablecer contraseña
    const resetUrl = `http://${req.headers.host}/resetear_contrasena/${usuario.token}`;

    await enviarCorreo.enviarCorreo({
      usuario,
      subject: "Restablece tu contraseña de tu cuenta Delimar",
      resetUrl,
      vista: "email_restablecer",
      text:
        "Has solicitado restablecer tu contraseña de Taskily! Autoriza el contenido HTML.",
    });
  
  

    req.flash(
      "success",
      "Se envió un enlace para reestablecer tu contraseña a tu correo electrónico"
    );
    res.redirect("/iniciar_sesion");
  };


exports.validarToken = async (req, res, next) => {
  try {
    
    const { token } = req.params;

    const usuario = await Usuario.findOne({
      where: {
        token,
      },
    });

    // Si no se encuentra el usuario
    if (!usuario) {
      req.flash("error", "¡El enlace que seguiste no es válido!");
      res.redirect("/reestablecer_contrasena");
    }

    // Si el usuario existe, mostrar el formulario de generar nueva contraseña
    res.render("resetear_contrasena", { layout: "auth", token });
  } catch (error) {
    res.redirect("/iniciar_sesion");
  }
};

// Permite cambiar la contraseña de un token válido
exports.actualizarPassword = async (req, res, next) => {

  const usuario = await Usuario.findOne({
    where: {
      token: req.params.token,
      expiration: {
        [Op.gte]: Date.now(),
      },
    },
  });
// Verificar que se obtiene un usuario
if (!usuario) {
  req.flash(
    "error","Token no válido o vencida. El token tiene 1 hora de validez"
  );
  res.redirect("/reestablecer_contrasena");
}

// Si el token es correcto y aún no vence
usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

// Limpiar los valores del token y de la expiración
usuario.token = null;
usuario.expiration = null;

// Guardar los cambios
await usuario.save();

// Redireccionar al inicio de sesión
req.flash("success", "Tu contraseña se ha actualizado correctamente");
res.redirect("/iniciar_sesion");


}