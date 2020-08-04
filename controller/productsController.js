const Producto = require("../models/productmodel");
const { lista } = require("./delimarController");

exports.agregarproducto = (req, res, next) => {
    res.render("homeagregarproductos");
};

exports.homeagregarproductos = async(req, res, next) => {
   const { name, price, libra, description } = req.body;
   const {filename} = req.file;
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
            imagepath: "../public/imagenes/upload_images/"+filename
        });
        errors.push({
            error: "Producto almacenado satisfactoriamente",
            type: "alert-sucess",
        });

        res.render("homeagregarproductos", {
          errors,
        });

    } catch (errors) {
      errors.push({
        error: "Ha ocurrido un error en el servidor de base de datos, comunicate con personal autorizado de Delimar.",
        type: "alert-warning",
      });
    }
   }
}

//Obtener los productos en inventario
exports.productosInv = async(req, res , next) =>{
    const errors = [];
    try {
      const productos = await Producto.findAll();
      res.render("lista", {productos});

    } catch (error) {
        errors.push({error: "Error al obtener los productos",
        type: "alert-warning"
        });

        res.render("lista", errors);
    }
}

//Eliminar un producto
exports.eliminarProducto = async(req, res, next) => {
  //Obtener el url del producto a traves de un query de la peticion
  const { url } = req.query;

  //Intentar eliminar el producto
  try {
    const resultado = await Producto.destroy({
      where: {
        url
      }
    });
    res.status(200).send("Producto eliminado correctamente");
  } catch (error) {
    //SI el producto no se elimina
    return next;
  }
}
