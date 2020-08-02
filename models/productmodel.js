const Sequelize = require("sequelize");

//configuracion de la base de datos
const db = require("../config/db");

//Importar slug y shortid
const slug = require("slug");
const shortid = require("shortid");

//Importar el modulo Multer
const multer = require("multer");
//Importar path para el nombre de las imagenes
const path = require("path");

//Guardar las imagenes con un nombre aleatorio
const storage = multer.diskStorage({
  //Ruta en la cual se guardaran las imagenes
  destination: "../public/imagenes",
  //configuracion del callback con shortid para el nombre
  filename: (req, file, cb) =>{
    cb(null, shortid.generate() + path.extname(file.originalname));
  }
});

//Variable para obtener los datos con Multer
const guardar = multer({
  storage,
}).single('picture');

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
    },
    image_path: {
      type: Sequelize.STRING,
      defaultValue: storage.filename
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
