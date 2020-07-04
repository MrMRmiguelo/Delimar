// Importar express router
const express = require("express"); 
const routes = express.Router();


// Importar los controladores
const proyectosController = require("../controller/delimarController");

module.exports = function () {
    routes.get("/", proyectosController.home);

    routes.get("/prueba", proyectosController.prueba);
    return routes;
}