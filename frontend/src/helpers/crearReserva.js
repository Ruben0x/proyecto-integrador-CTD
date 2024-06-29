import axios from 'axios';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL;
const loggedToken = sessionStorage.getItem('token');

export const crearReserva = async (datos) => {
  try {
    const res = await axios.post(`${apiUrl}/reservas`, datos, {
      headers: {
        Authorization: `Bearer ${loggedToken}`,
      },
    });
    const reservaId = res.data.id;
    await modReserva(datos, reservaId);
    // toast.success('Producto reservado con éxito');
  } catch (error) {
    console.error(error.message);
    toast.error(error.response.data.message);
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

    if (res.status === 200) {
      toast.success('Producto reservado con éxito');
      setTimeout(() => {
        location.replace('/auth/user');
      }, 500);
    }
  } catch (error) {
    // console.log(error.message);
    toast.error(error.response.data.message);
    setTimeout(() => {
      location.replace(`/instrumentos/${datos.productoId}`);
    }, 500);
  }
};
