import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { TiendaRouter } from './routes/TiendaRouter';
import { AdminPage } from './pages/AdminPage';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path='/administracion' element={<AdminPage />} />
        <Route path='/*' element={<TiendaRouter />} />
      </Routes>
    </>
  );
};
