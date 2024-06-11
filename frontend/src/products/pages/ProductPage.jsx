import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import WestIcon from '@mui/icons-material/West';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import ShareIcon from '@mui/icons-material/Share';
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Characteristics } from '../components/Characteristics';
import { GridImagenes } from '../components/GridImagenes';
import { GlobalUserDataContext } from '../../auth/helpers/globalUserData';
import { ProductCalendar } from '../components/ProductCalendar';
import Politicas from '../components/Politicas';
import { useUsers } from '../../context/store/UsersProvider';

export const ProductPage = () => {
  const { id } = useParams();
  const [instrumento, setInstrumento] = useState([]);
  const [listaImagenes, setListaImagenes] = useState([]);
  const [favs, setFavs] = useState(false);
  const { isLogged } = useContext(GlobalUserDataContext);

  const apiUrl = import.meta.env.VITE_API_URL;

  const { userState } = useUsers();

  const accessToken = userState.token.accessToken;
  const loggedToken = sessionStorage.getItem('token');

  useEffect(() => {
    if (loggedToken) {
      getItemById(loggedToken);
    } else {
      getItemById(accessToken);
    }
  }, []);

  const getItemById = (token) => {
    axios(`${apiUrl}/productos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setInstrumento(res.data);
        setListaImagenes(res.data.imagenes || []);
      })
      .catch((err) => {
        console.log('Error ' + err.message);
      });
  };

  if (!instrumento) {
    return <Navigate to={'/'} />;
  }

  const handleAddFav = (params) => {
    setFavs(!favs);
    console.log(instrumento);
  };

  const handleReserva = () => {
    !isLogged ? alert('Debes estar logueado') : alert('hola');
  };

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
        <Box>
          {isLogged && (
            <Box sx={{ position: 'absolute' }}>
              <IconButton
                size='large'
                aria-label='add to favorites'
                onClick={handleAddFav}
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
            </Box>
          )}
          <GridImagenes listaImagenes={listaImagenes} />
        </Box>
        <Grid item xs={12} sm container alignItems='stretch'>
          <Grid
            item
            xs={12}
            md={6}
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
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ backgroundColor: 'background.main', padding: 3 }}
          >
            <Characteristics instrumento={instrumento} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            backgroundColor={'lightgray'}
            sx={{ padding: 3 }}
          >
            <Typography
              sx={{ textDecoration: 'underline' }}
              variant='subtitle1'
              textTransform={'uppercase'}
              fontWeight={800}
              textAlign={'center'}
            >
              políticas de reserva
            </Typography>
            <Politicas />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            <Grid item xs={12} md={6} display={'flex'} flexDirection={'column'}>
              <Typography
                variant='subtitle1'
                textTransform={'uppercase'}
                fontWeight={600}
                textAlign={'center'}
                paddingY={3}
              >
                Selecciona las fechas que necesitas y reserva{' '}
                <Box component={'span'} color={'primary.main'}>
                  ahora
                </Box>
              </Typography>
              <ProductCalendar />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display={'flex'}
            flexDirection={'column'}
          ></Grid>
        </Grid>
      </Box>
    </Container>
  );
};
