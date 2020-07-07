const Usuario = require("../models/usuario");

exports.crearCuentaAdmin = (req, res, next) =>{
    res.render("crearUsuario", {layout: "autenticacion"});
}

exports.crearCuenta = async(req, res, next) => {
    const {fullname, user, password} = req.body;

    try {
        await Usuario.create({
            fullname,
            user,
            password
        });

        res.redirect("iniciarSesion", {layout: "autenticacion"});
    } catch (error) {
        res.render("crearUsuario", {
            error,
        })
    }
}