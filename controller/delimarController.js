exports.home = (req, res, next) => {
    res.render("paginaPrincipal");
};

exports.prueba = (req, res, next) => {
    res.send("Prueba");
};

exports.homeproductos = (req, res, next) => {
    res.render("homeproductos");
};