// Importar los modulos de express.js
const express = require("express");
//Importar Handlebars
const exphbs = require("express-handlebars");
//Importar todas las rutas de routes
const routes = require("./routes");

// Conexion con la base de dattos MYSQL
const db = require("./config/db");

//Importar los modelos de productos
require("./models/productmodel");

// Conexion mediante promesas
db.sync()
     .then(() => console.log("Connected to the database server"))
     .catch((error) => console.log(error));

// App de express
const app = express();

// Template engine (Handlebars)

app.engine("hbs",exphbs({defaultLayout: 'main', extname: ".hbs"}));

//Rutas para el servidor
app.use("/", routes());

// Inicializar
app.listen(7000, () => {
     console.log("Server running on port 7000");
});