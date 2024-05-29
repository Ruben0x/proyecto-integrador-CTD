import { useContext } from 'react';
import { GlobalUserDataContext } from '../auth/helpers/globalUserData';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const { globalUserData } = useContext(GlobalUserDataContext);
  console.log(globalUserData.rol);

  return globalUserData.rol === 'admin' ? children : <Navigate to='/' />;
};
