import { Box, CardMedia, Container, Link, Typography } from '@mui/material';
import React from 'react';
import imgError from '../assets/img/404.png';
import { Link as RouterLink } from 'react-router-dom';

export const Error404 = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'userBg.main',
        minHeight: '80vh',
      }}
    >
      <Typography variant='h4' textAlign={'center'} width={'90%'}>
        <Box component='span' color={'primary.main'}>
          LO SENTIMOS.
        </Box>
        LO QUE BUSCAS NO ESTA EN NUESTRO SISTEMA
      </Typography>
      <CardMedia
        component='img'
        sx={{ width: 300, height: 250 }}
        image={imgError}
        alt='Live from space album cover'
      />
      <Link component={RouterLink} to='/'>
        <Typography variant='h4'>VOLVER AL HOME</Typography>
      </Link>
    </Container>
  );
};
