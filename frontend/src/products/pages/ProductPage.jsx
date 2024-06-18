import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { useFavoritos } from '../../context/store/FavoritosProvider';
import { toast } from 'sonner';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import SimplePopup from '../../components/SharePopup';
import { userProductos } from '../../context/store/ProductosProvider';

export const ProductPage = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const { id } = useParams();
  const [instrumento, setInstrumento] = useState(null);
  const [listaImagenes, setListaImagenes] = useState([]);
  const { isLogged, globalUserData } = useContext(GlobalUserDataContext);
  const { deleteFavs, addFavoritos } = useFavoritos();
  const [refresh, setRefresh] = useState(false);
  const { userState } = useUsers();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { addFav, deleteFav } = userProductos();

  const accessToken =
    userState?.token?.accessToken || sessionStorage.getItem('token');

  const [favs, setFavs] = useState(false);

  const shareUrl = `${import.meta.env.VITE_LOCAL_URL}/instrumentos/${id}`;

  const title = 'Mira este fabuloso instrumento! ';

  useEffect(() => {
    if (accessToken) {
      getItemById(accessToken);
    }
  }, [accessToken, refresh]);

  useEffect(() => {
    if (instrumento) {
      setFavs(instrumento.esFavorito);
    }
  }, [instrumento]);

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

  if (instrumento === null) {
    return <div>Loading...</div>;
  }

  if (!instrumento) {
    return <Navigate to={'/'} />;
  }

  const handleAddFavs = () => {
    addFavoritos(globalUserData.id, instrumento.id);
    addFav(instrumento.id);
    toast.success('Agregado a favoritos');
    setFavs(true);
    handleRefresh();
  };

  const handleClickOpen = () => {
    setDeleteModal(true);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  const handleAcceptDelete = (user, producto) => {
    deleteFavs(user, producto);
    deleteFav(producto);
    toast.success('Eliminado de favoritos');
    setFavs(false);
    setDeleteModal(false);
    handleRefresh();
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
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
          <Box sx={{ position: 'absolute' }}>
            <SimplePopup url={shareUrl} title={title} />
            {isLogged &&
              (favs ? (
                <IconButton
                  size='large'
                  aria-label='add to favorites'
                  onClick={handleClickOpen}
                >
                  <FavoriteIcon color='buttonRed' />
                </IconButton>
              ) : (
                <IconButton
                  size='large'
                  aria-label='add to favorites'
                  onClick={handleAddFavs}
                >
                  <FavoriteTwoToneIcon color='warning' />
                </IconButton>
              ))}
          </Box>
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
              Políticas de reserva
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
        </Grid>
      </Box>
      {deleteModal && (
        <Dialog
          open={deleteModal}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          fullWidth={true}
          maxWidth={'xs'}
          sx={{ textAlign: 'center' }}
        >
          <DialogContent>
            <ErrorOutlineOutlinedIcon sx={{ fontSize: 150 }} color='primary' />
          </DialogContent>
          <DialogTitle id='alert-dialog-title' fontWeight={600}>
            {'¿Estás seguro?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description' fontWeight={600}>
              Esta acción eliminará al producto de sus Favoritos
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button
              variant='contained'
              color='buttonGreen'
              onClick={() =>
                handleAcceptDelete(globalUserData.id, instrumento.id)
              }
              autoFocus
            >
              ELIMINAR
            </Button>
            <Button variant='contained' color='buttonRed' onClick={handleClose}>
              CANCELAR
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};
