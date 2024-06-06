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
  Typography,
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { DataGrid } from '@mui/x-data-grid';

export const TableAllFavs = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [favorito, setFavorito] = useState();

  const { getAllFavoritos, isLoading, favState, deleteFavs } = useFavoritos();
  const { globalUserData } = useContext(GlobalUserDataContext);

  useEffect(() => {
    getAllFavoritos(globalUserData.id);
  }, []);

  const handleClickOpen = (params) => {
    setFavorito(params.row);
    setDeleteModal(true);
  };
  const handleClose = () => {
    setDeleteModal(false);
  };
  if (isLoading) return 'Cargando...';

  const listaProductos = [];

  favState.favoritos.forEach((element) => {
    listaProductos.push(element.producto);
  });
  console.log(listaProductos);

  const handleAcceptDelete = (user, producto) => {
    deleteFavs(user, producto);
    setDeleteModal(false);
  };
  const renderActions = (params) => {
    return (
      <>
        <Button
          size='small'
          variant='contained'
          color='buttonRed'
          onClick={() => handleClickOpen(params)}
          startIcon={<DeleteOutlineOutlinedIcon />}
        >
          <Typography fontWeight={600}>Eliminar</Typography>
        </Button>
      </>
    );
  };

  return (
    <>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            rows={listaProductos}
            columns={[
              {
                field: 'imagen',
                headerName: 'Imagen',
                width: 100,
                renderCell: (params) => {
                  const imageUrl = params.row.imagenUrl;
                  return (
                    <img
                      src={imageUrl}
                      alt={params.row.nombre}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                      }}
                    />
                  );
                },
              },
              { field: 'nombre', headerName: 'Nombre', width: 100 },
              {
                field: 'categoriaS',
                headerName: 'Categoria',
                width: 100,
                valueGetter: (values, row) => {
                  return `${row.categoriaS.nombre || ''}`;
                },
              },
              {
                field: 'marcaS',
                headerName: 'Marca',
                width: 100,
                valueGetter: (values, row) => {
                  return `${row.marcaS.nombre || ''}`;
                },
              },

              {
                field: 'accions',
                headerName: 'Acciones',
                width: 100,
                renderCell: renderActions,
              },
            ]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
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
              Esta acción eliminara al producto de sus Favoritos
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button
              variant='contained'
              color='buttonGreen'
              onClick={() => {
                handleAcceptDelete(globalUserData.id, favorito.id);
              }}
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
