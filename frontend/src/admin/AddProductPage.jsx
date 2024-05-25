import React from 'react';
import { Container, Typography } from '@mui/material';
import { AddProductForm } from './components/AddProductForm';

export const AddProductPage = () => {
  return (
    <Container>
      <Typography variant='h4' sx={{ pb: 3 }}>
        Agregar Producto
      </Typography>
      <AddProductForm />
    </Container>
  );
};
