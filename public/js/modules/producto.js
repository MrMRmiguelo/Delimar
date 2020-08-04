//Importar los modulos a utilizar
import axios from "axios";
import Swal from "sweetalert2";

const btnEliminar = document.querySelector("#eliminar_producto");

//Agragr evento al click del boton
btnEliminar.addEventListener("click", (e) => {
  //Capturar el url del proyecto
  const urlProducto = e.target.dataset.productoUrl;

  Swal.fire({
    title: "¿Estás seguro de que deseas eliminar el producto?",
    text: "Si elimina este producto no se podra recuperar",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then((result) => {
    //SI el usuario confima la eliminacion del producto
    if (result.value){
      //Obtener la url del sitio
      const url = `${location.origin}/producto/${urlProducto}`;

      //Implementacion de AXIOS
    }
  });
});

export default btnEliminar;
