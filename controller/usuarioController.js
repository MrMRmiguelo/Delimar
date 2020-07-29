const Usuario = require("../models/usuario");

exports.crearCuentaAdmin = (req, res, next) =>{
    res.render("crearUsuario", {layout: "autenticacion"});
}

exports.crearUsuario = async(req, res, next) => {
    const { fullname, email, user, password, level} = req.body;

    try {
        await Usuario.create({
            fullname,
            email,
            user,
            password,
            leve,
        });

        res.redirect("homeproductos");
    } catch (error) {
        res.render("registrarse", { layout: "auth", error: error.message });
    }
}

exports.homeproductos = (req, res, next) => {
    res.render("homeproductos", { layout: "auth", messages });
};
