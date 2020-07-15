const Usuario = require("../models/usuario");

exports.crearCuentaAdmin = (req, res, next) =>{
    res.render("crearUsuario", {layout: "autenticacion"});
}

exports.crearUsuario = async(req, res, next) => {
    const { fullname, user, password } = req.body;

    try {
        await Usuario.create({
            fullname,
            user,
            password
        });

        res.render("homeproductos", {layout: "autenticacion"});
    } catch (error) {
        res.render("crearUsuario", {
            error,
        })
    }
}