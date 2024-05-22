import axios from 'axios';
import { toast } from 'sonner';

export const createUser = (user) => {
  axios
    .post('http://localhost:3000/usuarios', user)
    .then((res) => {
      if (res.status === 201) {
        toast.success('Producto creado exitosamente');
        window.location.replace('/');
      }
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};
