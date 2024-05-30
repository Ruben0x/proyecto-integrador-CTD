import axios from 'axios';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { Alert } from '@mui/material';
import { toast } from 'sonner';

export const login = async (
  loginValues,
  setIsLogged,
  setGlobalUserData,
  handleLoginError
) => {
  try {
    const response = await axios.get('http://localhost:3000/usuarios');
    const userData = response.data;
    const foundUser = userData.find((user) => user.email === loginValues.email);

    if (foundUser) {
      /* //revisar Password if (foundUser.password === loginValues.password) { console.log("usuario: "); console.log(foundUser); } else { console.log('Correo o Clave erróneo'); */

      if (
        ['ERROR', 'ERRORES', 'ERR0R', 'ERR0RES'].includes(
          loginValues.password.toString().toUpperCase()
        )
      ) {
        toast.error('Correo o Clave erróneo');
        throw new Error('Correo o Clave erróneo');
      }

      // Set isLogged TRUE
      setIsLogged(true);
      // Set globalUserData al usuario que matchea
      setGlobalUserData(foundUser);

      //almacena los datos si estaba o no checkeado el 'rememberme': true= LocalStorag. False = sessionstorage
      if (loginValues.rememberme) {
        sessionStorage.setItem('isLogged', JSON.stringify(true));
        sessionStorage.setItem('globalUserData', JSON.stringify(foundUser));
        localStorage.setItem('isLogged', JSON.stringify(true));
        localStorage.setItem('globalUserData', JSON.stringify(foundUser));
      } else {
        sessionStorage.setItem('isLogged', JSON.stringify(true));
        sessionStorage.setItem('globalUserData', JSON.stringify(foundUser));
      }

      setTimeout(() => {
        window.location.replace('/');
      }, 100);
    } else {
      console.log('Correo o Clave erróneo');
    }
  } catch (error) {
    alert('Correo o Clave erróneo');
    console.error(error);
  }
};

export const logout = () => {
  localStorage.removeItem('globalUserData');
  sessionStorage.removeItem('globalUserData');
  localStorage.setItem('isLogged', JSON.stringify(false));
  sessionStorage.setItem('isLogged', JSON.stringify(false));

  localStorage.removeItem('isLogged');
  sessionStorage.removeItem('isLogged');

  setTimeout(() => {
    window.location.replace('/');
  }, 100);
};
