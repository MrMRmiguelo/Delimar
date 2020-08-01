// Importar express router
const express = require("express");
const routes = express.Router();


const { body } = require("express-validator");

// Importar los controladores
const delimarController = require("../controller/delimarController");
const usuariosController =  require("../controller/usuarioController");
const productosController = require("../controller/productsController");

module.exports = function () {

    routes.get("/", delimarController.home);

    routes.get("/prueba", delimarController.prueba);

    routes.get("/crear_usuario", usuariosController.crearUsuario);

    routes.get("/iniciar_sesion", usuariosController.IniciarSesion);
    
    routes.post("/iniciar_sesion",
    body("email").notEmpty().trim(),
    body("password").notEmpty().trim(), 
    delimarController.autenticarUsuario);

    routes.get("/agregar_producto",body("name").notEmpty().trim().escape(), productosController.agregarproducto);

    routes.post("/agregar_producto", productosController.homeagregarproductos);

    // routes.post(
    //   "/agregar_producto",
    //   delimarController.usuarioAutenticado,
    //   // Sanitizar el contenido del formulario
    //   //body("name").notEmpty().trim().escape(),
    //   productosController.homeagregarproductos
    // );

    routes.post(
      "/crear_usuario",
      // Sanitizar el contenido del formulario
     body("fullname").notEmpty().trim().escape(),
      usuariosController.crearUsuario
    );

    // routes.post(
    //   "/homeproductos",
    //   // Sanitizar el contenido del formulario
    //   body("user").notEmpty().trim(),
    //   body("password").notEmpty().trim(),
    //   delimarController.homeproductos
    // );

    routes.get("/lista_producto", productosController.productosInv);

  
  routes.get("/reestablecer_contrasena", usuariosController.ReestablecerContrasena );

  routes.post("/reestablecer_contrasena", delimarController.enviarToken);

  routes.get("/resetear_contrasena/:token", delimarController.validarToken);
  routes.post("/resetear_contrasena/:token",body("password").notEmpty().trim(), delimarController.actualizarPassword);

    return routes;
}
