import Swal from 'sweetalert2';
import axios from 'axios';

const vacantes = document.querySelector('.panel-administracion');

if(vacantes) {
  vacantes.addEventListener('click', e => {
    if (e.target.dataset.eliminar) {
      const Boton = e.target;
      const idVacante = Boton.dataset.eliminar;
      Swal.fire({
        title: '¿Estas seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminalo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          const url = location.origin + '/vacante/' + idVacante;
          axios.delete(url)
            .then(respuesta => {
              if (respuesta.status === 200) {
                Boton.parentElement.parentElement.parentElement.removeChild(Boton.parentElement.parentElement);
                Swal.fire(
                  '¡Vacante Eliminada!',
                  respuesta.data,
                  'success'
                );
              } 
            })
            .catch(()=> {
              Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: "¡No Completo la solicitud",
                });
            });
        }
      });
    }
  });
}


export default vacantes;