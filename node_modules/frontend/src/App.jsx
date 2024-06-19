import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TiendaRouter } from './routes/TiendaRouter';
import { AdminPage } from './pages/AdminPage';
import { PrivateRoute } from './routes/PrivateRoute';

export const App = () => {
  return (
    <>
      <Routes>
        <Route
          path='/administracion'
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route path='/*' element={<TiendaRouter />} />
      </Routes>
    </>
  );
};
