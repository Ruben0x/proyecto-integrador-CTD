import {
  Box,
  Button,
  CircularProgress,
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
import { useInstrumento } from '../hooks/useInstrumento';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IniciarReserva from '../components/IniciarReserva';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const ProductPage = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const { id } = useParams();
  const { isLogged, globalUserData } = useContext(GlobalUserDataContext);
  const { deleteFavs, addFavoritos } = useFavoritos();
  const { userState } = useUsers();
  const { addFav, deleteFav } = userProductos();
  const accessToken =
    userState?.token?.accessToken || sessionStorage.getItem('token');
  const { instrumento, listaImagenes, error } = useInstrumento(id, accessToken);
  const [favs, setFavs] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (instrumento) {
      setFavs(instrumento.esFavorito);
    }
  }, [instrumento]);

  if (error) return <Navigate to={'/404'} />;

  if (!instrumento) return <CircularProgress />;

  const shareUrl = `${import.meta.env.VITE_LOCAL_URL}/instrumentos/${id}`;
  const title = 'Mira este fabuloso instrumento! ';

  const handleAddFavs = () => {
    addFavoritos(globalUserData.id, instrumento.id);
    addFav(instrumento.id);
    toast.success('Agregado a favoritos');
    setFavs(true);
    setRefresh(!refresh);
  };

  const handleAcceptDelete = (user, producto) => {
    deleteFavs(user, producto);
    deleteFav(producto);
    toast.success('Eliminado de favoritos');
    setFavs(false);
    setDeleteModal(false);
    setRefresh(!refresh);
  };
  const handleClickOpen = () => setDeleteModal(true);

  const handleClose = () => setDeleteModal(false);

  return (
    <Container sx={{ minHeight: '90vh', backgroundColor: 'white' }}>
      <Box>
        <Box paddingY={2}>
          <Link
            component={RouterLink}
            to='/'
            sx={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <WestIcon fontSize='medium' sx={{ paddingRight: 1 }} />
            <Typography>Volver al Home</Typography>
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
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              margin: '1.5em',
              background: '#F9E9DE',
              borderRadius: '3em',
            }}
          >
            <SimplePopup url={shareUrl} title={title} />
            {isLogged && (
              <IconButton
                size='large'
                aria-label='add to favorites'
                onClick={favs ? handleClickOpen : handleAddFavs}
              >
                {favs ? (
                  <FavoriteIcon color='buttonRed' />
                ) : (
                  <FavoriteTwoToneIcon color='warning' />
                )}
              </IconButton>
            )}
          </Box>
          <GridImagenes listaImagenes={listaImagenes} />
        </Box>
      </Box>
      {/* ----------------------- DATA INSTRUMENTO -------------------------- */}
      <Grid
        container
        sx={{
          padding: 4,
          backgroundColor: '#121312',
          color: '#FFFFFF',
          marginBottom: '10%',
        }}
      >
        <Grid item xs={12}>
          {/* DATA */}
          <Grid
            container
            sx={{
              padding: 4,
              backgroundColor: '#121312',
              color: '#FFFFFF',
            }}
          >
            <Grid item xs={12} md={3}>
              <Typography variant='subtitle1' sx={{ fontSize: '1.5em' }}>
                Categoría:
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant='subtitle1' sx={{ fontSize: '1.5em' }}>
                <span
                  style={{
                    color: '#FF5500',
                    textTransform: 'uppercase',
                  }}
                >
                  {instrumento.nombreCategoria}
                </span>
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography variant='subtitle1' sx={{ fontSize: '1.5em' }}>
                Marca:
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant='subtitle1' sx={{ fontSize: '1.5em' }}>
                <span
                  style={{
                    color: '#FF5500',
                    textTransform: 'uppercase',
                  }}
                >
                  {instrumento.nombreMarca}
                </span>
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography variant='subtitle1' sx={{ fontSize: '1.5em' }}>
                Modelo:
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant='subtitle1' sx={{ fontSize: '1.5em' }}>
                <span
                  style={{
                    color: '#FF5500',
                    textTransform: 'uppercase',
                  }}
                >
                  {instrumento.nombre}
                </span>
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography variant='subtitle1' sx={{ fontSize: '1.5em' }}>
                Descripción:
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant='subtitle1' sx={{ fontSize: '1.5em' }}>
                <Box
                  component='span'
                  sx={{
                    color: '#FF5500',
                    textTransform: 'uppercase',
                  }}
                >
                  {instrumento.descripcion}
                </Box>
              </Typography>
            </Grid>
          </Grid>

          {/* PRECIO */}
          <Box
            sx={{
              padding: 4,
              backgroundColor: '#444444',
              color: '#FFFFFF',
            }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                md={3}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Typography variant='subtitle1' sx={{ fontSize: '1.5em' }}>
                  Costo de arriendo:
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={9}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Typography variant='subtitle1' sx={{ fontSize: '1.5em' }}>
                  <span style={{ color: '#FF5500', fontSize: '1.5em' }}>
                    ${new Intl.NumberFormat().format(instrumento.precio)} x día
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Acordeones */}
          <Box>
            <Accordion
              sx={{
                marginTop: 2,

                backgroundColor: '#F9E9DE',
                color: '#121312',
              }}
            >
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    textDecoration: 'underline',
                    fontWeight: 600,
                    padding: 2,
                  }}
                >
                  CARACTERÍSTICAS
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: 2,
                  backgroundColor: '#ffffff',
                }}
              >
                <Characteristics instrumento={instrumento} />
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ backgroundColor: '#F9E9DE', color: '#121312' }}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls='panel2-content'
                id='panel2-header'
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    textDecoration: 'underline',
                    fontWeight: 600,
                    padding: 2,
                  }}
                >
                  POLÍTICAS DE RESERVA
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: 2,
                  backgroundColor: '#ffffff',
                }}
              >
                <Politicas />
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ backgroundColor: '#F9E9DE', color: '#121312' }}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls='panel3-content'
                id='panel3-header'
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    textDecoration: 'underline',
                    fontWeight: 600,
                    padding: 2,
                  }}
                >
                  RESERVA AHORA
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: 2,
                  backgroundColor: '#ffffff',
                }}
              >
                <Grid container display='flex' flexDirection='column'>
                  <ProductCalendar
                    fechasReservadas={instrumento.reserva}
                    instrumento={instrumento}
                  />
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
      </Grid>

      {/* Delete Modal */}
      <Dialog
        open={deleteModal}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        fullWidth
        maxWidth='xs'
        sx={{ textAlign: 'center' }}
      >
        <DialogContent>
          <ErrorOutlineOutlinedIcon sx={{ fontSize: 150 }} color='primary' />
        </DialogContent>
        <DialogTitle id='alert-dialog-title' fontWeight={600}>
          ¿Estás seguro?
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
    </Container>
  );
};
