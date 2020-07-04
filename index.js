// Importar los modulos de express.js

const express = require("express");

//Importar todas las rutas de routes
const routes = require("./routes");

// App de express

const app = express();

//Rutas para el servidor
app.use("/", routes());

// Inicializar

app.listen(7000, () => {
     console.log("Server running on port 7000");
});