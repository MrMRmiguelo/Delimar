// Importar express router
const express = require("express"); 
const routes = express.Router();


// Importar los controladores
const delimarController = require("../controller/delimarController");
const usuariosController =  require("../controller/usuarioController");
const productosController = require("../controller/productsController");

module.exports = function () {
    routes.get("/", delimarController.home);

    routes.get("/prueba", delimarController.prueba);

    routes.get("/homeproductos", delimarController.homeproductos);

    routes.get("/crear_usuario", usuariosController.crearCuentaAdmin);

    routes.post("/crear_usuario", usuariosController.crearUsuario);
    
    routes.get("/agregar_producto", productosController.agregarproducto);

    routes.post("/agregar_producto", productosController.homeagregarproductos);
    
    routes.get("/lista_producto", delimarController.lista);

    return routes;
}