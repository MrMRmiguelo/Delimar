// Importar los modulos de express.js

const express = require("express");

//Importar todas las rutas de routes
const routes = require("./routes");

// App de express

const app = express();

app.use("/", routes());

// Inicializar

app.listen(7000, () => {
     console.log("servidor ejecutandose en 7000");
});