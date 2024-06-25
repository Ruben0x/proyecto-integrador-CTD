import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
} from '@mui/material';
import axios from 'axios';

export const TableAllReservations = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      const loggedToken = sessionStorage.getItem('token');
      if (!loggedToken) {
        setError('No se encontró el token de autenticación');
        setLoading(false);
        return;
      }

      try {
        const reservasResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/reservas`,
          {
            headers: {
              Authorization: `Bearer ${loggedToken}`,
            },
          }
        );
        const reservasData = reservasResponse.data;

        const reservasDetalles = reservasData.map((reserva) => {
          const imagenUrl =
            reserva.imagen && reserva.imagen.length > 0
              ? reserva.imagen[0]
              : '/default-image.png';

          const instrumento = {
            nombre: reserva.nombre,
            imagenUrl,
          };

          return {
            ...reserva,
            instrumento,
          };
        });

        setReservas(reservasDetalles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  if (loading) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: 2,
          padding: 2,
        }}
      >
        <Typography variant='h5' gutterBottom>
          Cargando reservas...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: 2,
          padding: 2,
        }}
      >
        <Typography variant='h5' gutterBottom>
          Error al cargar las reservas
        </Typography>
        <Typography variant='body1' color='textSecondary'>
          {error}
        </Typography>
      </Container>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  console.log(reservas);
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 2,
        padding: 2,
      }}
    >
      <Typography variant='h5' gutterBottom>
        RESERVAS
      </Typography>
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        {reservas.length === 0 ? (
          <Typography variant='body1' color='textSecondary'>
            No tienes reservas actualmente
          </Typography>
        ) : (
          <List sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
            {reservas.map((reserva, index) => (
              <ListItem
                key={`${reserva.id}-${index}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  padding: 1,
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={reserva.instrumento.imagenUrl}
                    alt={reserva.instrumento.nombre}
                    sx={{ width: 50, height: 50 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box component='span'>
                      <Typography
                        variant='body1'
                        component='span'
                        fontWeight='bold'
                      >
                        {reserva.instrumento.nombre}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box component='span'>
                      <Typography
                        variant='body2'
                        component='span'
                        display='block'
                      >
                        <Typography variant='body2' component='span'>
                          Fecha de Inicio:{' '}
                        </Typography>
                        <Typography
                          variant='body2'
                          component='span'
                          fontWeight='bold'
                        >
                          {formatDate(reserva.fechaInicio)}
                        </Typography>
                      </Typography>
                      <Typography
                        variant='body2'
                        component='span'
                        display='block'
                      >
                        <Typography variant='body2' component='span'>
                          Fecha de Término:{' '}
                        </Typography>
                        <Typography
                          variant='body2'
                          component='span'
                          fontWeight='bold'
                        >
                          {formatDate(reserva.fechaFin)}
                        </Typography>
                      </Typography>
                      <Typography
                        variant='body2'
                        component='span'
                        display='block'
                      >
                        <Typography variant='body2' component='span'>
                          Punto de Retiro:{' '}
                        </Typography>
                        <Typography
                          variant='body2'
                          component='span'
                          fontWeight='bold'
                        >
                          {reserva.sucursal}
                        </Typography>
                      </Typography>
                    </Box>
                  }
                  sx={{ flex: 1, minWidth: 200 }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};
