import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const InstrumentCardResponsive = ({ instrument }) => {
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
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'black',
        flexDirection: {
          xs: 'column', // Vertical en pantallas pequeñas
          md: 'column', // Horizontal en pantallas medianas
          lg: 'row', // Horizontal en pantallas medianas
          // Horizontal en pantallas medianas
        },
        maxWidth: {
          xs: 300, // Vertical en pantallas pequeñas
          md: 300, // Horizontal en pantallas medianas
          lg: 600, // Horizontal en pantallas medianas
        },
      }}
    >
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
      <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
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
        <Typography color='white' variant='subtitle2' alignSelf='end' p={3}>
          <Link to={'/instrumentos/' + id}>Ver mas...</Link>
        </Typography>
      </Box>
    </Box>
  );
};
