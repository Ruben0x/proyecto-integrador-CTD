import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateNewUserPage } from './pages/CreateNewUserPage';
import { HomePage } from './pages/HomePage';
import { LogInPage } from './pages/LogInPage';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import ResponsiveBody from './components/ResponsiveBody';

export const App = () => {
  return (
    <>
      <ResponsiveAppBar />
      <ResponsiveBody />
      <Routes>
        <Route element={<LogInPage />} path='/login' />
        <Route element={<CreateNewUserPage />} path='/createuser' />
        <Route element={<HomePage />} path='/' />
      </Routes>
    </>
  );
};
