const Producto = require("../models/productmodel");
const { lista } = require("./delimarController");

exports.agregarproducto = (req, res, next) => {
    res.render("homeagregarproductos");
};

exports.homeagregarproductos = async(req, res, next) => {
   const { name, price, libra, description } = req.body;
   const messages = [];

   if (!name){
       messages.push({error: "El nombre del proyecto no puede ser vacio."});
   }

   //Si hay algun error
   if(messages.length){
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
            description,
        });
        messages.push({
            error: "Producto almacenado satisfactoriamente",
            type: "alert-sucess",
        });

        res.render("homeproductos", {layout: "main"});
    } catch (error) {
        res.render("homeagregarproductos", {
            error,
        })
    }
   }
}

//Obtener los productos en inventario
exports.productosInv = async(req, res , next) =>{
    const messages = [];
    try {
        const productos  = await Producto.findAll();

        res.render("lista", {productos});

    } catch (error) {
        messages.push({error: "Error al obtener los productos",
        type: "alert-warning"
        });

        res.render("lista", messages);
    }

}
