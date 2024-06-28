import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
let reservaId;
const loggedToken = sessionStorage.getItem('token');

export const crearReserva = async (datos) => {
  try {
    const res = await axios.post(`${apiUrl}/reservas`, datos, {
      headers: {
        Authorization: `Bearer ${loggedToken}`,
      },
    });

    if (res.status === 201) {
      // console.log(res);
      const reservaId = res.data.id;
      // console.log(`ID de reserva ${reservaId}`);
      await modReserva(datos, reservaId); // Asegúrate de que modReserva sea también una función asíncrona si estás utilizando async/await aquí
    }
  } catch (error) {
    console.error(error.message);
    //toast.error(error.response.data.message);
  }
};

//====
const modReserva = async (datos, id) => {
  try {
    const res = await axios.patch(`${apiUrl}/reservas/${id}`, datos, {
      headers: {
        Authorization: `Bearer ${loggedToken}`,
      },
    });

    if (res.status === 201) {
      console.log(res);
      //toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error);
    //toast.error(error.response.data.message);
  }
};
