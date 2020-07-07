// Importar los modulos necesarios
const Sequelize = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt-nodejs");

// Crear el modelo para los Usuarios
const Usuario = db.define("usuario",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Debes ingresar tu nombre completo :)",
        },
      },
    },
    user: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: {
        args: true,
        msg: "Ya existe este nombre de usuario :(",
      },
      validate: {
        notEmpty: {
          msg: "Debes ingresar un nombre de usuario :)",
        },
      },
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Debes ingresar una contraseña :)",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate(usuario) {
        usuario.password = bcrypt.hashSync(
          usuario.password,
          bcrypt.genSaltSync(13)
        );
      },
    },
  }
);

// Exportar el modulo
module.exports = Usuario;