import React from 'react';
import { AddProductForm } from './AddProductForm';
import { Container, Typography } from '@mui/material';

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
