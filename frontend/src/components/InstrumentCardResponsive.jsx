import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import ShareIcon from '@mui/icons-material/Share';
import { Box, CardActions, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { GlobalUserDataContext } from '../auth/helpers/globalUserData';

export const InstrumentCardResponsive = ({ instrument }) => {
  const [favs, setFavs] = useState(false);
  const { isLogged } = useContext(GlobalUserDataContext);
  const {
    id,
    nombre,
    descripcion,
    nombreCategoria,
    nombreMarca,
    precio,
    imagenes,
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
    <Card
      sx={{
        display: 'flex',
        backgroundColor: 'black',
        flexDirection: {
          xs: 'column', // Vertical en pantallas pequeñas
          md: 'row', // Horizontal en pantallas medianas
        },
        textAlign: 'left',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {isLogged && (
          <CardActions disableSpacing sx={{ position: 'absolute' }}>
            <IconButton
              size='large'
              aria-label='add to favorites'
              onClick={() => {
                setFavs(!favs);
              }}
            >
              {favs ? (
                <FavoriteIcon color='buttonRed' />
              ) : (
                <FavoriteTwoToneIcon color='warning' />
              )}
            </IconButton>
            <IconButton aria-label='share'>
              <ShareIcon color='primary' />
            </IconButton>
          </CardActions>
        )}

        <CardMedia
          component='img'
          sx={{ width: '300px', height: '300px' }}
          image={imagenes[0]}
          alt='Live from space album cover'
        />
        <Box sx={stripStyles}>
          <Typography variant='h5' component='div' color={'#FFFFFF'}>
            {nombreCategoria}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
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
          <Link to={'/instrumentos/' + id}>Ver más...</Link>
        </Typography>
      </Box>
    </Card>
  );
};
