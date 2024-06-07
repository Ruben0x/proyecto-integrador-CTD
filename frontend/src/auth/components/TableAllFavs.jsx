import React, { useContext, useEffect, useState } from 'react';
import { useFavoritos } from '../../context/store/FavoritosProvider';
import { GlobalUserDataContext } from '../helpers/globalUserData';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Link } from 'react-router-dom';

export const TableAllFavs = () => {
  const { getAllFavoritos, isLoading, favState, deleteFavs } = useFavoritos();
  const { globalUserData } = useContext(GlobalUserDataContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [favorito, setFavorito] = useState();

  useEffect(() => {
    getAllFavoritos(globalUserData.id);
  }, []);

  const handleClickOpen = (favorito) => {
    setFavorito(favorito);
    setDeleteModal(true);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  if (isLoading) return 'Cargando...';

  const handleAcceptDelete = (user, producto) => {
    deleteFavs(user, producto);
    setDeleteModal(false);
  };

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: 2,
        }}
      >
        <Typography variant='h5' gutterBottom>
          FAVORITOS
        </Typography>
        <Box sx={{ width: '100%' }}>
          <List>
            {favState.favoritos.map((fav) => (
              <ListItem
                key={fav.producto.id}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={fav.producto.imagenUrl}
                    alt={fav.producto.nombre}
                    sx={{ width: 50, height: 50 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Link
                      to={`/instrumentos/${fav.producto.id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <Typography
                        variant='body1'
                        component='span'
                        fontWeight='bold'
                      >
                        {fav.producto.nombre}
                      </Typography>
                    </Link>
                  }
                  secondary={
                    <Box>
                      <Typography variant='body2'>{`Categoría: ${fav.producto.categoriaS.nombre}`}</Typography>
                      <Typography variant='body2'>{`Marca: ${fav.producto.marcaS.nombre}`}</Typography>
                    </Box>
                  }
                />
                <Button
                  size='small'
                  variant='contained'
                  color='buttonRed'
                  onClick={() => handleClickOpen(fav.producto)}
                  startIcon={<DeleteOutlineOutlinedIcon />}
                >
                  <Typography fontWeight={600}>Eliminar</Typography>
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
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
            {'¿Estas seguro?'}
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
              onClick={() => handleAcceptDelete(globalUserData.id, favorito.id)}
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
    </>
  );
};
