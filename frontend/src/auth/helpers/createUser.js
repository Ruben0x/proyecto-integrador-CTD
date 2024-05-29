import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'sonner';
import { GlobalUserDataContext } from './globalUserData';

export const createUser = (user) => {
  axios
    .post('http://localhost:3000/usuarios', user)
    .then((res) => {
      if (res.status === 201) {
        toast.success('Producto creado exitosamente');
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
  console.log(isAdmin);
  axios
    .patch('http://localhost:3000/usuarios/' + user.id, { rol: isAdmin })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        toast.success('Usuario actualizado con éxito');
      }
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};
