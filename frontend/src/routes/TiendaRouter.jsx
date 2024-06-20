import React, { useContext, useEffect } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { Footer } from '../components/Footer';
import { RegisterPage } from '../auth/RegisterPage';
import { LogInPage } from '../auth/LogInPage';
import { UserInfoPage } from '../auth/UserInfoPage';
import { ProductPage } from '../products/pages/ProductPage';
import { ProductCatPage } from '../pages/ProductCatPage';
import { useUsers } from '../context/store/UsersProvider';
import { GlobalUserDataContext } from '../auth/helpers/globalUserData';
import { ProductSearchPage } from '../pages/ProductSearchPage';
import { Toaster } from 'sonner';
import { CircularProgress } from '@mui/material';
import { Error404 } from '../pages/Error404';

export const TiendaRouter = () => {
  const { getAnonToken, isLoading } = useUsers();
  const { isLogged } = useContext(GlobalUserDataContext);

  useEffect(() => {
    if (!isLogged) {
      getAnonToken();
    }
  }, []);

  if (isLoading) return <CircularProgress />;
  return (
    <>
      <ResponsiveAppBar />
      <Toaster position='bottom-right' richColors />
      <div>
        <Routes>
          <Route element={<HomePage />} path='/' />
          <Route element={<RegisterPage />} path='/auth/registro' />
          <Route element={<UserInfoPage />} path='/auth/user' />
          <Route element={<LogInPage />} path='/auth/login' />
          <Route element={<ProductPage />} path='/instrumentos/:id' />
          <Route element={<ProductCatPage />} path='/instrumentos/cat/:id' />
          <Route element={<ProductSearchPage />} path='/search' />
          <Route element={<Error404 />} path='/404' />
          <Route path='*' element={<Navigate to='/404' replace={false} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};
