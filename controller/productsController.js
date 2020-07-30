const Producto = require("../models/productmodel");
const { lista } = require("./delimarController");

exports.agregarproducto = (req, res, next) => {
    res.render("homeagregarproductos");
};

exports.homeagregarproductos = async(req, res, next) => {
   const { name, price, libra, description } = req.body;
   const errors = [];

   if (!name){
     errors.push({error: "El nombre del producto no puede ser vacio.", type: "alert-danger"});
   }else if (!price) {
     errors.push({error: "El precio no puede ser vacio o 0.", type: "alert-danger"});
   }else if (!libra) {
     errors.push({error: "Debe ingresar la cantidad de libras.", type: "alert-danger"});
   }else if (!description) {
     errors.push({error: "El producto debe tener una description", type: "alert-danger"});
   }

   //Si hay algun error
   if(errors.length){
    res.render("homeagregarproductos", {
        errors,
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
        errors.push({
            error: "Producto almacenado satisfactoriamente",
            type: "alert-sucess",
        });

        res.render("homeagregarproductos", {
          errors,
        });

    } catch (errors) {
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
