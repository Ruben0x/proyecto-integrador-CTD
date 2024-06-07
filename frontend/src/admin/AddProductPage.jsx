import React from 'react';
import { AdminLayout } from './layout/AdminLayout';
import { AddProductForm } from './components/Product/AddProductForm';

export const AddProductPage = () => {
  return (
    <AdminLayout title={'Agregar Producto'}>
      {/* <AddProductForm /> */}
      <AddProductForm />
    </AdminLayout>
  );
};
