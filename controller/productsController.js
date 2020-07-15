const Producto = require("../models/productmodel");

exports.agregarproducto = (req, res, next) => {
    res.render("homeagregarproductos");
};

exports.homeagregarproductos = async(req, res, next) => {
   const { name, price, libra } = req.body;

   try {
       await Producto.create({
           name,
           price,
           libra
       });

       res.render("homeproductos", {layout: "autenticacion"});
   } catch (error) {
       res.render("homeagregarproductos", {
           error,
       })
   }
}