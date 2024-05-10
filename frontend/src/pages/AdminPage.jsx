import { Box, Button, Container, CssBaseline, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuAdmin } from '../components/MenuAdmin';

export const AdminPage = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia('(max-width: 600px)').matches
  );
  // const isMobile = window.matchMedia('(max-width: 600px)').matches;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 600px)').matches);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <Container>
          <Typography align='center'>
            Lo sentimos, el panel de Adminitracion no está disponible en
            dispositivos móviles.
          </Typography>
        </Container>
      ) : (
        <Box sx={{ display: 'flex' }}>
          {/* <PanelAdmin /> */}
          <ul>
            <li>
              <Link to={'/agregar-producto'}>
                <Button color='primary'>Agregar Producto</Button>
              </Link>
            </li>
            <li>
              <Link to={'/listar-productos'}>
                <Button color='primary'>Lista de productos</Button>
              </Link>
            </li>
          </ul>
        </Box>
      )}
    </>
  );
};
