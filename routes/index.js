// Importar express router
const express = require("express"); 
const routes = express.Router();

// Rutas para autenticación
   routes.get("/crear_usuario", usuarioController.crearUsuario);

  routes.post(
    "/registrate",
    // Sanitizar el contenido del formulario
    body("fullname").notEmpty().trim().escape(),
    usuariosController.crearUsuario
  );

  routes.get("/iniciar_sesion", usuariosController.formularioIniciarSesion);

  routes.post(
    "/iniciar_sesion",
    // Sanitizar el contenido del formulario
    body("email").notEmpty().trim(),
    body("password").notEmpty().trim(),
    delimarController.homeproductos
  );

  routes.get("/cerrar_sesion", authController.cerrarSesion);


// Importar los controladores
const delimarController = require("../controller/delimarController");
const usuariosController =  require("../controller/usuarioController");
const productosController = require("../controller/productsController");

module.exports = function () {
    routes.get("/", delimarController.home);

    routes.get("/prueba", delimarController.prueba);

    routes.get("/homeproductos", usuariosController.homeproductos);

    routes.post("/homeproductos", usuariosController.homeproductos);

    routes.get("/crear_usuario", usuariosController.crearCuentaAdmin);

    routes.post("/crear_usuario", usuariosController.crearUsuario);
    
    routes.get("/agregar_producto", productosController.agregarproducto);

    routes.post("/agregar_producto", productosController.homeagregarproductos);
    
    routes.get("/lista_producto", delimarController.lista);

   

    return routes;
}