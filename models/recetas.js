const Sequelize = require("sequelize");

//configuracion de la base de datos
const db = require("../config/db");

//Importar slug y shortid
const slug = require("slug");
const shortid = require("shortid");

// Creacion del modelo
const Receta = db.define("recetas", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:{
          args: true,
          msg: "Ya existe una receta con ese nombre"
        }
    },
    
    ingrediente: {
        type: Sequelize.FLOAT
    },
    description: {
        type: Sequelize.STRING
    },
    imagepath:{
      type: Sequelize.STRING
    },
},)

module.exports = Receta;