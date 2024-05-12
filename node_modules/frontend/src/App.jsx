import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateNewUserPage } from './pages/CreateNewUserPage';
import { HomePage } from './pages/HomePage';
import { LogInPage } from './pages/LogInPage';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import ResponsiveBody from './components/ResponsiveBody';
import { AddProductPage } from './pages/AddProductPage';

import { AdminPage } from './pages/AdminPage';
import { AdminProductList } from './pages/AdminProductList';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route element={<HomePage />} path='/' />
        <Route element={<LogInPage />} path='/login' />
        <Route element={<CreateNewUserPage />} path='/createuser' />
        <Route element={<AdminPage />} path='/administracion' />
        <Route element={<AdminProductList />} path='/listar-productos' />
        <Route element={<AddProductPage />} path='/agregar-productos' />
      </Routes>

      <Footer />
    </>
  );
};
