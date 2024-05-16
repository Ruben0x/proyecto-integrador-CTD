import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext, useEffect } from 'react';
import { ItemsContext } from '../context/ItemsContext';
import { useState } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import MediaCard from './MediaCard';
import { Link } from 'react-router-dom';

export const InstrumentCard = ({ instrument }) => {
  // console.log(instrument);

  const {
    nombre,
    descripcion,
    nombreCategoria,
    nombreMarca,
    precio,
    urlImg,
    id,
  } = instrument;

  const stripStyles = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '90%',
    height: '50px',
    backgroundColor: 'rgba(137, 137, 137, 0.7)',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
  };

  return (
    <Card sx={{ display: 'flex', backgroundColor: 'black' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component='img'
          sx={{ width: 300, height: 250 }}
          image={urlImg[0]}
          alt='Live from space album cover'
        />
        <Box sx={stripStyles}>
          <Typography variant='h5' component='div' color={'#FFFFFF'}>
            {nombreCategoria}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography
            component='div'
            variant='h5'
            fontWeight='bold'
            color='primary'
          >
            {nombreMarca}
          </Typography>
          <Typography variant='h6' color='white' component='div' paddingY={1}>
            {nombre}
          </Typography>
          <Typography
            variant='h5'
            color='primary'
            component='div'
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            ${precio} <Typography color='white'> /diario</Typography>
          </Typography>
          <Typography color='white' pt={1} variant='subtitle2'>
            {descripcion}
          </Typography>
        </CardContent>
        <Typography
          color='white'
          pt={1}
          variant='subtitle2'
          alignSelf='end'
          pb={3}
        >
          <Link to={'/instrumentos/' + id}>Ver mas...</Link>
        </Typography>
      </Box>
    </Card>
  );
};
