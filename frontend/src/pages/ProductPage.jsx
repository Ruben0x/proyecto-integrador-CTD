import { Box, Container, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GridImagenes } from '../components/GridImagenes';
import WestIcon from '@mui/icons-material/West';
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Characteristics } from '../products/components/Characteristics';

export const ProductPage = () => {
  const { id } = useParams();
  const [instrumento, setInstrumento] = useState([]);
  const [listaImagenes, setListaImagenes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios(`${import.meta.env.VITE_API_URL}/productos/` + id)
      .then((res) => {
        setInstrumento(res.data);
        setListaImagenes(res.data.imagenes || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (!instrumento) {
    return <Navigate to={'/'} />;
  }

  // console.log(instrumento);
  if (isLoading) return 'Cargando...';

  return (
    <Container sx={{ minHeight: '90vh', backgroundColor: 'white' }}>
      <Box sx={{ margin: 2 }}>
        <Box paddingY={2}>
          <Link
            component={RouterLink}
            style={{ textDecoration: 'none' }}
            to={'/'}
          >
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              <WestIcon fontSize='large' sx={{ paddingRight: 2 }} />
              VOLVER AL HOME
            </Typography>
          </Link>
        </Box>
        <Typography
          variant='h3'
          sx={{
            color: '#ff5000',
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          {instrumento.nombreMarca}
          <span style={{ color: '#000000' }}> {instrumento.nombre}</span>
        </Typography>
        <GridImagenes listaImagenes={listaImagenes} />
        <Box sx={{ padding: 2, backgroundColor: '#000000', color: 'white' }}>
          <Typography variant='h4' color='white'>
            {instrumento.nombreCategoria}
          </Typography>
          <Typography variant='h4' color='primary'>
            {' '}
            {instrumento.nombreMarca}{' '}
          </Typography>
          <Typography variant='subtitle1' py={1}>
            {instrumento.descripcion}
          </Typography>
          <Typography variant='h5' color='primary' py={1}>
            ${instrumento.precio}{' '}
            <span style={{ color: 'white' }}>/diario</span>
          </Typography>
        </Box>
        <Characteristics instrumento={instrumento} />
      </Box>
    </Container>
  );
};
