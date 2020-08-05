// Importar los modulos de express.js
const express = require("express");
//Importar Handlebars
const exphbs = require("express-handlebars");
// Importar connect-flash para disponer de los errores en todo el sitio
const flash = require("connect-flash");
const multer = require("multer");
const shortid = require("shortid");

const helpers = require("./helpers");

//Almacenar las imaganes con multer
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'public/imagenes/upload_images');
  },
  filename: function(req, file, cb){
    cb(null, shortid.generate() + file.originalname);
  }
});

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

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});




var client_id = 'AaTkm8etF7Sv2tcpx7Rv6f7p2co6okcxSZcpjW0CgRbSpx1Qe0jImVRLgaQLMYHxz_EfnHd1eR-gTVaw';
var secret = 'EE8Vi6CpRgxi7v0WPd-mkztA-aXTqKDTfOtmezIcYJ2ca3BqdkugjAWVDClem08mmshoG5vmSCd8fX4z';

app.use(bodyParser.json());

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': client_id,
  'client_secret': secret
});
app.get('/create', function(req, res){
  //build PayPal payment request
  var total = cart.totalPrice;
  var payReq = JSON.stringify({
      'intent':'sale',
      'redirect_urls':{
          'return_url':'http://localhost:7000/process',
          'cancel_url':'http://localhost:7000/cancel'
      },
      'payer':{
          'payment_method':'paypal'
      },
      'transactions':[{
          'amount':{
              'total': '5',
              'currency':'USD'
          },
          'description':'Para mas informacion contactarnos a nuestras redes sociales'
      }]
  });

  paypal.payment.create(payReq, function(error, payment){
      if(error){
          console.error(error);
      } else {
          //capture HATEOAS links
          var links = {};
          payment.links.forEach(function(linkObj){
              links[linkObj.rel] = {
                  'href': linkObj.href,
                  'method': linkObj.method
              };
          })

          //if redirect url present, redirect user
          if (links.hasOwnProperty('approval_url')){
              res.redirect(links['approval_url'].href);
          } else {
              console.error('no redirect URI present');
          }
      }
  });
});

app.get('/process', function(req, res){
  var paymentId = req.query.paymentId;
  var payerId = { 'payer_id': req.query.PayerID };

  paypal.payment.execute(paymentId, payerId, function(error, payment){
      if(error){
          console.error(error);
      } else {
          if (payment.state == 'approved'){
              res.send('pago realizado con exito');
          } else {
              res.send('El pago no fue realizado con exito, contactenos para mas informacion');
          }
      }
  });
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

//Filtros para las imagenes
const fileFilter = (req, file, cb) => {
  //Aceptar la imagen si cumple con los parametros
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
    cb(null, true);
  }else {
    cb(null, false);
  }
};

app.use(multer({
  storage: storage,
  limits:{
    //limite de 10mb como maximo para cada imagen
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter,
}).single('image'));


//Rutas para el servidor
app.use("/", routes());

// Inicializar
app.listen(7000, () => {
     console.log("**************************************************************Server running on port 7000***********************************************************");
});
