const Usuario = require("../models/usuario");

exports.crearCuentaAdmin = (req, res, next) =>{
    res.render("crearUsuario", {layout: "auth"});
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

        res.redirect("homeproductos");
    } catch (error) {
        res.render("crearUsuario", { layout: "auth", error: error.message });
    }
}

exports.homeproductos = (req, res, next) => {

    const messages = res.locals.messages;
    res.render("homeproductos", { layout: "auth", messages });
};
