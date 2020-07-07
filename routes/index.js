// Importar express router
const express = require("express"); 
const routes = express.Router();


// Importar los controladores
const productosController = require("../controller/delimarController");
const usuariosController =  require("../controller/usuarioController");

module.exports = function () {
    routes.get("/", productosController.home);

    routes.get("/prueba", productosController.prueba);

    routes.get("/homeproductos", productosController.homeproductos);

    routes.get("/crear_usuario", usuariosController.crearCuentaAdmin);

    routes.post("/crear_usuario", usuariosController.crearUsuario);
    
    routes.post("/agregar_producto" ,productosController.homeagregarproducto);


    return routes;
}