import React, { useContext, useEffect } from 'react';
import { Grid, TextField, Typography, Box, Avatar } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AuthLayout } from '../auth/layout/AuthLayout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { GlobalUserDataContext } from '../auth/helpers/globalUserData';
import { InstrumentCardResponsiveXS } from './InstrumentCardResponsiveXS';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GoogleMaps from './GoogleMaps';
const handleLocationSelect = (id) => {
  console.log('ID de sucursal:', id);
  // Aquí puedes manejar el id recibido, por ejemplo, enviarlo a un formulario
};
const productoHardCode = {
  id: 1,
  nombre: 'Akai MPK Mini',
  descripcion: 'Controlador MIDI compacto y versátil',
  categoriaId: 3,
  nombreCategoria: 'Teclas',
  marcaId: 11,
  nombreMarca: 'Akai',
  precio: 15000,
  esFavorito: false,
  imagenes: [
    {
      id: 1,
      url: 'http://localhost:3000/images/Akai.jpg',
    },
    {
      id: 2,
      url: 'http://localhost:3000/images/akai2.jpg',
    },
    {
      id: 3,
      url: 'http://localhost:3000/images/aka3.jpg',
    },
    {
      id: 4,
      url: 'http://localhost:3000/images/aka4.jpg',
    },
    {
      id: 5,
      url: 'http://localhost:3000/images/aka5.jpg',
    },
    {
      id: 6,
      url: 'http://localhost:3000/images/aka6.jpg',
    },
  ],
  caracteristicas: [
    {
      caracteristicaId: 1,
      caracteristicaTipoCaracteristicaId: 4,
      nombre: 'TIPO DE INSTRUMENTO',
      icono: 'i-acero',
      descripcion: 'Tipo instrumento musical',
      valor: 'Electrónico',
    },
    {
      caracteristicaId: 2,
      caracteristicaTipoCaracteristicaId: 9,
      nombre: 'COLOR',
      icono: 'i-madera-roble',
      descripcion: 'Color del instrumento musical',
      valor: 'Negro',
    },
    {
      caracteristicaId: 3,
      caracteristicaTipoCaracteristicaId: 21,
      nombre: 'PESO (KG)',
      icono: 'i-aluminio',
      descripcion: 'Peso del instrumento musical en kilogramos',
      valor: '0.75',
    },
    {
      caracteristicaId: 4,
      caracteristicaTipoCaracteristicaId: 89,
      nombre: 'DIMENSIONES (CM)',
      icono: 'i-aluminio',
      descripcion: 'Dimensiones físicas del instrumento en centímetros',
      valor: '31 x 18 x 4',
    },
    {
      caracteristicaId: 5,
      caracteristicaTipoCaracteristicaId: 110,
      nombre: 'MATERIAL',
      icono: 'i-aluminio',
      descripcion: 'Materiales de los que está hecho el instrumento musical',
      valor: 'Plástico',
    },
    {
      caracteristicaId: 6,
      caracteristicaTipoCaracteristicaId: 114,
      nombre: 'CONTROLES',
      icono: 'i-aluminio',
      descripcion: 'Controles y ajustes disponibles en el instrumento musical',
      valor: 'Ruedas de modulación y pitch',
    },
    {
      caracteristicaId: 7,
      caracteristicaTipoCaracteristicaId: 132,
      nombre: 'INCLUYE',
      icono: 'i-aluminio',
      descripcion:
        'Accesorios o componentes adicionales que vienen con el instrumento musical',
      valor: 'Cable USB, software de producción',
    },
    {
      caracteristicaId: 8,
      caracteristicaTipoCaracteristicaId: 138,
      nombre: 'CONDICION',
      icono: 'i-aluminio',
      descripcion: 'Estado físico y funcional del instrumento musical',
      valor: 'Nuevo',
    },
  ],
};

export const Booking = () => {
  const location = useLocation();
  const { state } = location;

  // Check if state is null or undefined before destructuring
  const instrumento = state ? state.instrumento : null;
  const values = state ? state.values : null;

  const { isLogged, globalUserData } = useContext(GlobalUserDataContext);
  const iniciales = [
    globalUserData?.nombre.charAt(0).toUpperCase(),
    globalUserData?.apellido.charAt(0).toUpperCase(),
  ];
  const nombre = `${globalUserData?.nombre} ${globalUserData?.apellido}`;
  const email = globalUserData?.email;

  useEffect(() => {
    if (!isLogged) {
      window.location.replace('/auth/login');
    }
    // Additional logic as needed
  }, [isLogged]);

  // Render loading or handle state not initialized scenarios
  if (!state) {
    return <div>Loading...</div>; // or handle differently based on your application flow
  }
  return (
    <AuthLayout title='CONFIRMA' subtitle=' TU RESERVA'>
      <Grid
        container
        spacing={3}
        direction='column'
        alignItems='center'
        justifyContent='center'
      >
        {/*seccion detalles producto*/}
        <Grid item sx={{ width: '100%' }}>
          <InstrumentCardResponsiveXS instrument={instrumento} />
        </Grid>

        {/*seccion detalles clientes*/}
        <Grid item sx={{ width: '100%', margin: '20px 0px' }}>
          <Grid
            container
            spacing={3}
            direction='row'
            alignItems='center'
            justifyContent='center'
          >
            <Grid item>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 48,
                  height: 48,
                }}
              >
                {`${iniciales[0]}${iniciales[1]}`}
              </Avatar>
            </Grid>
            <Grid item xs={9} sm={5}>
              {' '}
              <TextField
                label='Nombre'
                value={nombre}
                InputProps={{ readOnly: true }}
                sx={{ pointerEvents: 'none', width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                label='Correo'
                value={email}
                InputProps={{ readOnly: true }}
                sx={{ pointerEvents: 'none', width: '100%' }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/*seccion fechas*/}
        <Grid item sx={{ width: '100%' }}>
          <Grid
            container
            spacing={3}
            direction='row'
            alignItems='center'
            justifyContent='center'
            sx={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}
          >
            <Grid item xs={6} md={3.5} order={{ xs: 2, md: 1 }}>
              <Box>
                <Typography
                  fontWeight='600'
                  color={'secondary.main'}
                  align='left'
                  sx={{ fontSize: '40PX' }}
                  display={'inline'}
                >
                  <ArrowBackIosIcon />
                </Typography>
                <Typography
                  fontWeight='600'
                  color={'primary.main'}
                  align='left'
                  sx={{ fontSize: '40PX' }}
                  display={'inline'}
                >
                  {values[0]}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={5} order={{ xs: 1, md: 2 }}>
              <Typography
                fontWeight='400'
                color={'#898989'}
                align='center'
                sx={{ fontSize: { xs: 30, md: 40 } }}
              >
                FECHA DE RESERVA
              </Typography>
            </Grid>

            <Grid item xs={6} md={3.5} order={{ xs: 3, md: 3 }}>
              <Box textAlign={'right'}>
                <Typography
                  fontWeight='600'
                  color={'primary.main'}
                  align='right'
                  sx={{ fontSize: '40PX' }}
                  display={'inline'}
                >
                  {values[1]}
                </Typography>
                <Typography
                  fontWeight='600'
                  color={'secondary.main'}
                  align='right'
                  sx={{ fontSize: '40PX' }}
                  display={'inline'}
                >
                  <ArrowForwardIosIcon />
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid>
            <GoogleMaps onLocationSelect={handleLocationSelect} />
          </Grid>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
