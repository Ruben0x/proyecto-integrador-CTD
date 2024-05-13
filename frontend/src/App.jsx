import { Route, Routes } from 'react-router-dom';
import { CreateNewUserPage } from './pages/CreateNewUserPage';
import { HomePage } from './pages/HomePage';
import { LogInPage } from './pages/LogInPage';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { AddProductPage } from './pages/AddProductPage';
import { AdminPage } from './pages/AdminPage';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route element={<LogInPage />} path='/login' />
        <Route element={<CreateNewUserPage />} path='/createuser' />
        <Route element={<HomePage />} path='/' />
        <Route element={<AddProductPage />} path='/addProduct' />
        <Route element={<AdminPage />} path='/administrador' />
      </Routes>

      <Footer />
    </>
  );
};
