import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { Footer } from '../components/Footer';
import { ProductPage } from '../pages/ProductPage';
import { RegisterPage } from '../auth/RegisterPage';
import { LogInPage } from '../auth/LogInPage';

export const TiendaRouter = () => {
  return (
    <>
      <ResponsiveAppBar />
      <div>
        <Routes>
          <Route element={<HomePage />} path='/' />
          <Route element={<RegisterPage />} path='/registro' />
          <Route element={<LogInPage />} path='/auth/login'/>
          <Route element={<ProductPage />} path='/instrumentos/:id' />
        </Routes>
      </div>
      <Footer />
    </>
  );
};
