import axios from 'axios';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL;

export const login = async (
  loginValues,
  setIsLogged,
  setGlobalUserData,
  getUserById,
  handleLoginError
) => {
  let errorMsg = 'Dirección de Correo Errónea';
  try {
    const response = await axios.post(`${apiUrl}/usuarios/login`, {
      email: loginValues.email,
      password: loginValues.password,
    });
    const loginResponse = response.data;

    // console.log(loginResponse);
    if (loginResponse?.statusCode === 400) {
      errorMsg = loginResponse.message;
      throw new Error(errorMsg);
    } else if (loginResponse.message === 'No Autorizado') {
      errorMsg = loginResponse.message;
      throw new Error(errorMsg);
    } else if (loginResponse?.usuarioId && loginResponse?.rol) {
      console.log(loginResponse);

      getUserById(loginResponse.usuarioId).then((foundUser) => {
        console.log(foundUser);
        // Set isLogged TRUE
        setIsLogged(true);
        // Set globalUserData al usuario que matchea
        setGlobalUserData(foundUser);

        //almacena los datos si estaba o no checkeado el 'rememberme': true= LocalStorag. False = sessionstorage
        if (loginValues.rememberme) {
          sessionStorage.setItem('isLogged', JSON.stringify(true));
          sessionStorage.setItem('globalUserData', JSON.stringify(foundUser));
          sessionStorage.setItem('token', loginResponse.token.accessToken);
          sessionStorage.setItem(
            'refreshToken',
            loginResponse.token.refreshToken
          );
          localStorage.setItem('isLogged', JSON.stringify(true));
          localStorage.setItem('globalUserData', JSON.stringify(foundUser));
          localStorage.setItem('token', loginResponse.token.accessToken);
          localStorage.setItem(
            'refreshToken',
            loginResponse.token.refreshToken
          );
        } else {
          sessionStorage.setItem('isLogged', JSON.stringify(true));
          sessionStorage.setItem('globalUserData', JSON.stringify(foundUser));
          sessionStorage.setItem('token', loginResponse.token.accessToken);
          sessionStorage.setItem(
            'refreshToken',
            loginResponse.token.refreshToken
          );
        }

        setTimeout(() => {
          window.location.replace('/');
        }, 100);
      });
    }
  } catch (error) {
    toast.error(errorMsg);

    // alert('Correo o Clave erróneo');
    console.error(error.message);
  }
};

export const logout = () => {
  localStorage.removeItem('globalUserData');
  sessionStorage.removeItem('globalUserData');
  localStorage.setItem('isLogged', JSON.stringify(false));
  sessionStorage.setItem('isLogged', JSON.stringify(false));
  localStorage.removeItem('isLogged');
  sessionStorage.removeItem('isLogged');
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');

  setTimeout(() => {
    window.location.replace('/');
  }, 100);
};
