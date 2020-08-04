const Sequelize = require("sequelize");

//configuracion de la base de datos
const db = require("../config/db");

//Importar slug y shortid
const slug = require("slug");
const shortid = require("shortid");

// Creacion del modelo
const Producto = db.define("producto", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING
    },
    price:{
        type: Sequelize.FLOAT
    },
    libra: {
        type: Sequelize.FLOAT
    },
    description: {
        type: Sequelize.STRING
    }
    // url:{
    //     type: Sequelize.STRING
    // }
}, 
// {
//     hooks: {
//         beforeCreate(producto) {
//             console.log("Antes de insertar a la base de datos");
//             const url = slug(producto.name).toLowerCase();

//             producto.url = `${url}_${shortid.generate()}`;
//         },
//         beforeUpdate(producto){
//             console.log("Antes de actualizar en la base");
//             const url = slug(producto.name).toLowerCase();

//             producto.url = `${url}_${shortid.generate()}`;
//         }
//     },
// }
);

// Importar el modelo para su utilizacion
module.exports = Producto;