import axios from 'axios';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL;

export const createUser = (user) => {
  axios
    .post(`${apiUrl}/usuarios`, user)
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
