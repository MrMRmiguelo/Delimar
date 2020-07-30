const Producto = require("../models/productmodel");
const { lista } = require("./delimarController");

exports.agregarproducto = (req, res, next) => {
    res.render("homeagregarproductos");
};

exports.homeagregarproductos = async(req, res, next) => {
   const { name, price, libra, description } = req.body;
   const messages = [];

   if (!name){
     messages.push({error: "El nombre del producto no puede ser vacio."});
   }else if (!price) {
     messages.push({error: "El precio no puede ser vacio o 0."});
   }else if (!libra) {
     messages.push({error: "Debe ingresar la cantidad de libras."});
   }else if (!description) {
     messages.push({error: "El producto debe tener una description"});
   }

   //Si hay algun error
   if(messages.length){
    res.render("homeagregarproductos", {
        messages,
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
        // messages.push({
        //     error: "Producto almacenado satisfactoriamente",
        //     type: "alert-sucess",
        // });

        res.render("homeproductos", {layout: "main"});
    } catch (messages) {
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
      Producto.findAll();

      res.render("lista", {productos});

    } catch (error) {
        messages.push({error: "Error al obtener los productos",
        type: "alert-warning"
        });

        res.render("lista", messages);
    }

}
