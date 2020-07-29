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
    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: {
        args: true,
        msg: "Ya existe un usuario registrado con esta dirección de correo",
      },
      validate: {
        notEmpty: {
          msg: "Debes ingresar un correo electrónico",
        },
        isEmail: {
          msg: "Verifica que tu correo es un correo electrónico válido",
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
    level: {
      type: Sequelize.STRING(10),
      allowNull: false,
      default: "user",
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
    token: Sequelize.STRING,
    expiration: Sequelize.DATE
  }
);


Usuario.prototype.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

// Exportar el modulo
module.exports = Usuario;
