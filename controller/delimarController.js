const Producto = require("../models/productmodel");
const passport = require("passport");
const Usuario = require("../models/usuario");
const Sequelize = require("sequelize");

// Verificar si el usuario se puede autenticar con sus credenciales
exports.autenticarUsuario = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/homeproductos",
    badRequestMessage: "Debes ingresar tu usuario y/o tu contraseña",
    failureFlash: true,
  });

exports.home = (req, res, next) => {
    res.render("paginaPrincipal");
};

exports.prueba = (req, res, next) => {
    res.send("Prueba");
};


exports.lista = (req, res, next) => {
     res.render("lista");
};

// Cerrar la sesión del usuario actual // Sesion endpoint
exports.cerrarSesion = (req, res, next) => {
    // Al cerrar sesión redirigimos al usuario al inicio de sesión
    req.session.destroy(() => {
      res.redirect("/homeproductos");
    });
  };

  // Verificar si el usuario está autenticado o no // Sesion middleware
exports.usuarioAutenticado = (req, res, next) => {
    // Si el usuario está autenticado que continúe con la petición
    if (req.isAuthenticated()) {
      return next();
    }

    // Si el usuario no está autenticado, iniciar sesión
    return res.redirect("/homeproductos");
  };
