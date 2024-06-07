import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { TiendaRouter } from './routes/TiendaRouter';
import { AdminPage } from './pages/AdminPage';
import { PrivateRoute } from './routes/PrivateRoute';
import { useUsers } from './context/store/UsersProvider';

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
