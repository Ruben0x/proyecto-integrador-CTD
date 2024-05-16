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

export const InstrumentCardCopy = () => {
  // console.log(instrument);
/* ==========QUITAR COMENTARIO AL FINALIZAR. REVISAR COMENTARIOS
  const {
    nombre,
    descripcion,
    nombreCategoria,
    nombreMarca,
    precio,
    urlImg,
    id,
  } = instrument;
*/
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
    <Card sx={{ 
      display: 'flex', 
      flexDirection: 'row', 
      backgroundColor: 'black',
      maxHeight: "250px",
      maxWidth: "600px",
      minWidth: "300px"
      }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component='img'
          sx={{ width: '300px', height: '250px', }}
          image={'/images/teclas-categorias.png'} /* {urlImg[0]} */
          alt='Live from space album cover'
        />
        <Box sx={stripStyles}>
          <Typography variant='h5' component='div' color={'#FFFFFF'}>
            {"Teclas"} {/* {nombreCategoria} */}
          </Typography>
          
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '100px' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography
            component='div'
            variant='h5'
            fontWeight='bold'
            color='primary'
          >
            {"Marca PRO"} {/* {nombreMarca} */}
          </Typography>
          <Typography variant='h6' color='white' component='div' paddingY={1}>
            {"Organo electrico"} {/* {nombreMarca} */}
          </Typography>
          <Typography
            variant='h5'
            color='primary'
            component='div'
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            ${"100.000.000"} <Typography color='white'> /diario</Typography>
          </Typography>
          <Typography color='white' pt={1} variant='subtitle2' maxHeight='10px' textOverflow='ellipsis'> 
            {/* {descripcion} */}
            {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
          </Typography>
        </CardContent>
        <Typography
          color='white'
          pt={1}
          variant='subtitle2'
          alignSelf='end'
          pb={3}
        >
          <Link to={'/instrumentos/' + "01"}>Ver mas...</Link> {/* {'/instrumentos/' + id} */}
        </Typography>
      </Box>
    </Card>
  );
};
