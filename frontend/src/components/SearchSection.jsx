import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Box, Button, Grid, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Calendario } from './Calendario';
import { useFormik } from 'formik';
import { BarraAutocompletado } from './BarraAutocompletado';
import { useNavigate } from 'react-router-dom';
import Banner from '../assets/img/Banner.webp';
import axios from 'axios';

const SearchSection = (props) => {
  const navigate = useNavigate();

  const loggedToken = sessionStorage.getItem('token');

  const formik = useFormik({
    initialValues: {
      searchField: '',
      dates: [],
    },
    onSubmit: async (values) => {
      const [startDate, endDate] = values.dates;
      const isWithinSpecialRange =
        startDate &&
        endDate &&
        startDate.getDate() === 17 &&
        endDate.getDate() === 18 &&
        startDate.getMonth() === 5 &&
        endDate.getMonth() === 5;
      if (isWithinSpecialRange) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/categorias/1/productos?filter=4`,
            {
              headers: {
                Authorization: `Bearer ${loggedToken}`,
              },
            }
          );

          console.log('Productos del endpoint:', response.data); // Impresión por consola

          // Redirigir a la página de búsqueda con la consulta y los productos del endpoint
          navigate('/search', { state: { query: response.data } });
        } catch (error) {
          console.error('Error al obtener los productos:', error);
        }
      } else {
        navigate('/search', { state: { query: values } });
      }
    },
  });

  const setSelectedDates = (dates) => {
    formik.setFieldValue('dates', dates);
  };

  return (
    <Container
      maxWidth='100%'
      className='section-buscar'
      sx={{
        // backgroundImage: `url('/images/banner-portal-sonoro 1.png')`,
        backgroundImage: `url(${Banner})`,
        backgroundSize: 'cover',
        minHeight: '300px',
        paddingBottom: '10px',
        backgroundPosition: useMediaQuery('(max-width:900px)')
          ? 'calc(0% - 490px + 10%)'
          : 'right',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box maxWidth={'1440px'} width={'100%'} sx={{ marginTop: '20px' }}>
        <Grid container columnSpacing={1}>
          <Grid item>
            <Typography color={'#FFFFFF'} variant='body1' fontSize={32}>
              Bienvenido a
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant='body1'
              sx={{
                fontWeight: '800',
                color: '#FF5500',
                display: 'inline',
                fontSize: 32,
              }}
            >
              PORTAL SONORO
            </Typography>
          </Grid>
        </Grid>
        <Typography color={'#FFFFFF'} fontSize={20}>
          Encuentra el equipamiento perfecto para ti
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3} sx={{ marginTop: '20px' }}>
            <Grid item xs={12} sm={5}>
              <BarraAutocompletado
                id='searchField'
                name='searchField'
                label='buscar'
                type='searchField'
                placeholder='Busca acá tu instrumento'
                value={formik.values.searchField}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                formik={formik}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Calendario setSelectedDates={setSelectedDates} />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                color='primary'
                sx={{
                  height: '52px', // Ajustar la altura para que coincida con otros componentes
                }}
              >
                BUSCAR
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SearchSection;
