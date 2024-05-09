import { Button, Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const AdminPage = () => {
  return (
    <Container>
      <Link to={'/addProduct'}>
        <Button color='primary'>Agregar Producto</Button>
      </Link>
    </Container>
  );
};
