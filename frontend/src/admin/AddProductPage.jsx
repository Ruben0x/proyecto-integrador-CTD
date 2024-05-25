import React from 'react';
import { Grid, Typography } from '@mui/material';
import { AddProductForm } from './components/AddProductForm';
import { AdminLayout } from './layout/AdminLayout';

export const AddProductPage = () => {
  return (
    <AdminLayout title={'Agregar Producto'}>
      <AddProductForm />
    </AdminLayout>
  );
};
