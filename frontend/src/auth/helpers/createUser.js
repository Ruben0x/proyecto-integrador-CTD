import axios from 'axios';
import { toast } from 'sonner';

export const createUser = (user) => {
  axios
    .post(`${process.env.import.meta.env.VITE_API_URL}/usuarios`, user)
    .then((res) => {
      if (res.status === 201) {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.replace('/');
        }, 1000);
      }
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

export const setUserToAdmin = (user) => {
  // console.log(user.rol);

  const isAdmin = user.rol === 'admin' ? 'registrado' : 'admin';
  axios
    .patch(`${process.env.import.meta.env.VITE_API_URL}/usuarios/` + user.id, {
      rol: isAdmin,
    })
    .then((res) => {
      if (res.status === 200) {
        toast.success('Usuario actualizado con éxito');
      } else {
        toast.error('Error al actualizar el usuario');
      }
    })
    .catch(() => {
      toast.error('Error al actualizar el usuario');
    });
};
