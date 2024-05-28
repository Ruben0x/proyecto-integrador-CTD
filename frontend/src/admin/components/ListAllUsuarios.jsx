import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
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
  Typography,
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { ItemsContext } from '../../context/ItemsContext';
import { useEffect, useContext } from 'react';
import { AdminLayout } from '../layout/AdminLayout';
import { useState } from 'react';
import { setUserToAdmin } from '../../auth/helpers/createUser';

export const ListAllUsuarios = ({}) => {
  const { itemState } = useContext(ItemsContext);
  const [usuario, setUsuario] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);

  const handleClickOpen = (params) => {
    setUsuario(params.row);
    setDeleteModal(true);
  };
  const handleClose = () => {
    setDeleteModal(false);
  };

  const handleAcceptAdmin = (usuarioAdmin) => {
    setUserToAdmin(usuarioAdmin);
    setDeleteModal(false);
  };

  const renderActions = (params) => {
    return (
      <>
        <Button
          size='small'
          sx={{ marginRight: 2 }}
          variant='contained'
          color='buttonGreen'
          onClick={() => handleClickOpen(params)}
          startIcon={<HistoryIcon />}
        >
          <Typography fontWeight={600}>Editar</Typography>
        </Button>
        <Button
          size='small'
          variant='contained'
          color='buttonRed'
          // onClick={() => handleClickOpen(params)}
          startIcon={<DeleteOutlineOutlinedIcon />}
        >
          <Typography fontWeight={600}>Eliminar</Typography>
        </Button>
      </>
    );
  };

  return (
    <AdminLayout title={'Todos los productos'}>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '90%' }}>
          <DataGrid
            rows={itemState.usuarios}
            columns={[
              { field: 'id', headerName: 'ID', width: 50 },
              { field: 'nombre', headerName: 'Nombre', width: 100 },
              { field: 'apellido', headerName: 'Apellido', width: 100 },
              {
                field: 'email',
                headerName: 'Email',
                width: 150,
              },
              { field: 'rol', headerName: 'Rol', width: 100 },
              {
                field: 'accions',
                headerName: 'Acciones',
                width: 280,
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
              Esta acción le modificara a {usuario.nombre} sus permisos de
              Administrador
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button
              variant='contained'
              color='buttonGreen'
              onClick={() => {
                handleAcceptAdmin(usuario);
              }}
              autoFocus
            >
              MODIFICAR
            </Button>
            <Button variant='contained' color='buttonRed' onClick={handleClose}>
              CANCELAR
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </AdminLayout>
  );
};
