const Usuario = require("../models/usuario");

exports.crearCuentaAdmin = (req, res, next) =>{
    res.render("userSesions/crearUsuario", {layout: "auth"});
}

exports.crearUsuario = async(req, res, next) => {
    const { fullname, email, user, password} = req.body;

    try {
        await Usuario.create({
            fullname,
            email,
            user,
            password
        });

        res.redirect("iniciar_sesion");
    } catch (error) {
        res.render("userSesions/crearUsuario", { layout: "auth", error: error.message });
    }
}

exports.IniciarSesion = (req, res, next) => {

    const messages = res.locals.messages;

    res.render("userSesions/iniciar_sesion", { layout: "auth", messages });
};

exports.ReestablecerContrasena = (req, res, next) => {
    res.render("reestablecer_contrasena", { layout: "auth" });
  };
