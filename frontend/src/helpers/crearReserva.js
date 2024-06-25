import axios from 'axios';


const apiUrl = import.meta.env.VITE_API_URL;
let reservaId;
const loggedToken = sessionStorage.getItem('token');

export const crearReserva = (datos) => {
  axios
    .post(`${apiUrl}/reservas`, datos, {
      headers: {
        Authorization: `Bearer ${loggedToken}`,
      },
    })
    .then((res) => {
      if (res.status === 201) {
        console.log(res);
        //toast.success(res.data.message);
        reservaId = res.data.id;
        console.log(`ID de reserva ${reservaId}`);
        modReserva(datos, reservaId)
      }
    })
    .catch((error) => {
      console.log(error);
      //toast.error(error.response.data.message);
    });
};

//====
const modReserva = (datos, id) => {
  console.log('para actualizar');
  console.log(datos);
  axios
    .patch(`${apiUrl}/reservas/${id}`, datos, {
      headers: {
        Authorization: `Bearer ${loggedToken}`,
      },
    })
    .then((res) => {
      if (res.status === 201) {
        console.log(res);
        //toast.success(res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      //toast.error(error.response.data.message);
    });
};
