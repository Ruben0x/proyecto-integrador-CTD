import { Box, Button, Container, Grid, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import WestIcon from '@mui/icons-material/West';
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Characteristics } from '../components/Characteristics';
import DateRangePickerComponent from '../components/DateRangePickerComponent';
import { GridImagenes } from '../components/GridImagenes';

export const ProductPage = () => {
  const { id } = useParams();
  const [instrumento, setInstrumento] = useState([]);
  const [listaImagenes, setListaImagenes] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios(`${apiUrl}/productos/` + id)
      .then((res) => {
        setInstrumento(res.data);
        setListaImagenes(res.data.imagenes || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!instrumento) {
    return <Navigate to={'/'} />;
  }

  // console.log(instrumento);

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

        <Grid container spacing={1}>
          <Grid item xs={12} md={6} sm container>
            <Grid item xs={12}>
              <Box
                sx={{ padding: 2, backgroundColor: '#000000', color: 'white' }}
              >
                <Typography
                  variant='h5'
                  color='white'
                  textTransform={'uppercase'}
                  fontWeight={600}
                >
                  {instrumento.nombreCategoria}
                </Typography>
                <Typography
                  variant='h4'
                  color='primary'
                  textTransform={'uppercase'}
                  fontWeight={600}
                >
                  {instrumento.nombreMarca}
                </Typography>
                <Typography variant='subtitle1' py={1}>
                  {instrumento.nombre}
                </Typography>
                <Typography variant='h5' color='primary' py={1}>
                  ${instrumento.precio}{' '}
                  <span style={{ color: 'white' }}>/diario</span>
                </Typography>
                <Typography variant='subtitle1' py={1}>
                  {instrumento.descripcion}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Characteristics instrumento={instrumento} />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} container>
            <Box display={'flex'} flexDirection={'column'}>
              <Typography
                variant='subtitle1'
                textTransform={'uppercase'}
                fontWeight={600}
                textAlign={'center'}
              >
                Selecciona las fechas que necesitas y reserva <span>ahora</span>
              </Typography>
              {/* <Typography
                variant='subtitle1'
                textTransform={'uppercase'}
                fontWeight={600}
                textAlign={'center'}
                >
                Inicia sesión para reservar
              </Typography> */}

              <DateRangePickerComponent />
              <Box sx={{ marginTop: 'auto' }}>
                <Button fullWidth variant='contained'>
                  Reservar
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
