// Importar los modulos de express.js
const express = require("express");
//Importar Handlebars
const exphbs = require("express-handlebars");
// Importar connect-flash para disponer de los errores en todo el sitio
const flash = require("connect-flash");
const helpers = require("./helpers");
//Importar el modulo Multer
const multer = require("multer");
//Importar shortid para el nombre de las imagenes
const shortid = require("shortid");
const path = require("path");


//Importar todas las rutas de routes
const routes = require("./routes");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
//importar passport para inicio de sesion
const passport = require("./config/passport");

// Conexion con la base de dattos MYSQL
const db = require("./config/db");

//Importar los modelos de productos
require("./models/productmodel");
require("./models/usuario");

// Conexion mediante promesas
db.sync()
     .then(() => console.log("***********************************************************Connected to the server database********************************************************"))
     .catch((error) => console.log(error));

// App de express
const app = express();

//Carpeta de archivos estaticos
app.use(express.static("public"));

// Template engine (Handlebars)
app.engine("hbs",exphbs({defaultLayout: 'main', extname: ".hbs"}));

app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: true }));

//Guardar las imagenes con un nombre aleatorio
const storage = multer.diskStorage({
  //Ruta en la cual se guardaran las imagenes
  destination: "public/imagenes",
  //configuracion del callback con shortid para el nombre
  filename: (req, file, cb) =>{
    cb(null, shortid.generate() + path.extname(file.originalname));
  }
});


// Habilitar el uso de cookieParser
app.use(cookieParser());

// Habilitar las sesiones de usuario
app.use(session({
       secret: process.env.SESSIONSECRET,
       resave: false,
       saveUninitialized: false,
     })
   );


app.use(flash());

//Instancia de passport
app.use(passport.initialize());
app.use(passport.session());

// Pasar algunos valores mediante middleware
app.use((req, res, next) => {
     // Pasar el usuario a las variables locales de la petición
     res.locals.usuario = { ...req.user } || null;
     res.locals.messages = req.flash();
     // Pasar valores de variables por el helper
     res.locals.vardump = helpers.vardump;
     // Continuar con el camino del middleware
     next();
   });

//Ejecutar el middleware de Multer
app.use(multer({
  storage,
}).single('picture'));

//Rutas para el servidor
app.use("/", routes());

// Inicializar
app.listen(7000, () => {
     console.log("**************************************************************Server running on port 7000***********************************************************");
});
