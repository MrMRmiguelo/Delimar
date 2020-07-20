const Producto = require("../models/productmodel");

exports.agregarproducto = (req, res, next) => {
    res.render("homeagregarproductos");
};

exports.homeagregarproductos = async(req, res, next) => {
   const { name, price, libra, description } = req.body;
   const errores = [];

   if (!name){
       errores.push({error: "El nombre del proyecto no puede ser vacio."});
   }

   //Si hay algun error
   if(errores.length){
    res.render("homeagregarproductos", {
        errores,
    });
   } else{
       //insertar los datos en la base de datos de productos
       try {
        await Producto.create({
            name,
            price,
            libra,
            description
        });
 
        res.render("homeproductos", {layout: "autenticacion"});
    } catch (error) {
        res.render("homeagregarproductos", {
            error,
        })
    }
   }
}