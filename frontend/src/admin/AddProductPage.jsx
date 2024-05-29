import React from 'react';
import { AddProductForm } from './components/AddProductForm';
import { AdminLayout } from './layout/AdminLayout';

export const AddProductPage = () => {
  return (
    <AdminLayout title={'Agregar Producto'}>
      <AddProductForm />
      {/* <AddProductFormcopy /> */}
    </AdminLayout>
  );
};
