//Importar passport
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Usuario = require("../models/usuario");

passport.use(
    new LocalStrategy(
    // Por defecto passport en LocalStrategy requiere de un usuario y una contraseña
    {
      usernameField: "user",
      passwordField: "password",
    },
    // Verificar si los datos enviados por el usuario son correctos
    async (email, password, done) => {
      try {
        // Realizar la búsqueda del usuario
        const usuario = await Usuario.findOne({
          where: { user },
        });

        // Si el usuario existe, verificar si su contraseña es correcta
        if (!usuario.comparePassword(password)) {
          return done(null, false, {
            message: "Nombre de usuario o contraseña incorrecta",
          });
        }

        // El usuario y la contraseña son correctas
        return done(null, usuario);
      } catch (error) {
        // El usuario no existe
        return done(null, false, {
          message: "El usuario no ha sido registrado",
        });
      }
    }
  )
);


// Permitir que passport lea los valores del objeto usuario
// Serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
  });
  
  // Deserializar el usuario
  passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
  });
  
  module.exports = passport;
  