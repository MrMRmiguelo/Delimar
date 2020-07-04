// Importar sequelize
const Sequelize = require("sequelize");
require("dotenv").config( {path: "variables.env" });

// Establecer la conexion con la base de datos
const db = new Sequelize("delimardb", process.env.MYSQLUSER, process.env.MYSQLPASS, {
    host: "localhost",
    dialect: "mysql",
    port: process.env.MYSQLPORT,
    operatorAliases: false,
    define: {
        timestamp: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;