// Importar express router
const express = require("express"); 
const routes = express.Router();


// Importar los controladores
const productosController = require("../controller/delimarController");

module.exports = function () {
    routes.get("/", productosController.home);

    routes.get("/prueba", productosController.prueba);

    routes.get("/homeproductos", productosController.homeproductos);
    
    return routes;
}