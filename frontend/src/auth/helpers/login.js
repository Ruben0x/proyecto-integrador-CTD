import axios from 'axios';

const handleSubmit = async (formData) => {
  try {
    const response = await axios.get('http://localhost:3000/usuarios');
    const userData = response.data;
    const foundUser = userData.find((user) => user.email === formData.email);
    if (foundUser) {
      console.log(foundUser);
    } else {
      console.log('Correo o Clave erróneo');
    }
  } catch (error) {
    console.error(error);
  }
};

export default handleSubmit;