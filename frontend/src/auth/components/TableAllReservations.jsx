import React, { useEffect } from 'react';
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
import { useReservas } from '../../context/store/ReservasProvider';

export const TableAllReservations = () => {
  const { isLoading, reservasState, getAllReservas } = useReservas();
  const { reservas } = reservasState;

  useEffect(() => {
    getAllReservas();
  }, [getAllReservas]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
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
                  textDecoration: 'none',
                  color: 'inherit',
                }}
                component='a'
                href={`/instrumentos/${reserva.id}`}
              >
                <ListItemAvatar>
                  <Avatar
                    src={
                      reserva.imagen && reserva.imagen.length > 0
                        ? reserva.imagen[0]
                        : '/default-image.png'
                    }
                    alt={reserva.nombre}
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
                        sx={{
                          color: 'inherit',
                          textDecoration: 'none',
                        }}
                      >
                        {reserva.nombre}
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
