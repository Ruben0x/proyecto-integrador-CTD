import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { Footer } from '../components/Footer';
import { RegisterPage } from '../auth/RegisterPage';
import { LogInPage } from '../auth/LogInPage';
import { UserInfoPage } from '../auth/UserInfoPage';
import { ProductPage } from '../products/pages/ProductPage';

export const TiendaRouter = () => {
  return (
    <>
      <ResponsiveAppBar />
      <div>
        <Routes>
          <Route element={<HomePage />} path='/' />
          <Route element={<RegisterPage />} path='/auth/registro' />
          <Route element={<UserInfoPage />} path='/auth/user' />
          <Route element={<LogInPage />} path='/auth/login' />
          <Route element={<ProductPage />} path='/instrumentos/:id' />
        </Routes>
      </div>
      <Footer />
    </>
  );
};
