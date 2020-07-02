const express = require("express");
const routes = express.Router();


//importar los controladores

const proyectosController = require("../controller/delimarcontroller");

module.experts = function () {
    routes.get("/", function (req, res, next) {
        res.send("Bienvenido");
    });

    routes.get("/prueba",function (req,res,next){
        res.send("Probando");
    });
    return routes;
}