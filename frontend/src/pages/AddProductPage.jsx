import React from 'react';
import { instrumentos } from '../assets/utils';
import { AddProductForm } from '../components/AddProductForm';
import { Container, Typography } from '@mui/material';

export const AddProductPage = () => {
  return (
    <Container>
      <Typography variant='h4' sx={{ py: 3 }}>
        {' '}
        Agregar Producto
      </Typography>
      <AddProductForm />
    </Container>
  );
};
