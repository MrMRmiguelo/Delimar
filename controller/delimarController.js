const Producto = require("../models/productmodel");
const passport = require("passport");
const Usuario = require("../models/usuario");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const crypto = require("crypto");

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
    const resetUrl = `http://${req.headers.host}/reestablecer_contrasena/${usuario.token}`;

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


  // Cerrar la sesión del usuario actual // Sesion endpoint
exports.cerrarSesion = (req, res, next) => {
  // Al cerrar sesión redirigimos al usuario al inicio de sesión
  req.session.destroy(() => {
    res.redirect("/iniciar_sesion");
  });
};



    
