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
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { setUserToAdmin } from '../../../auth/helpers/createUser';
import { AdminLayout } from '../../layout/AdminLayout';
import { useUsers } from '../../../context/store/UsersProvider';

export const ListAllUsuarios = ({}) => {
  const { getAllUsers, isLoading, userState, deleteUser } = useUsers();
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [usuario, setUsuario] = useState();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleClickOpen = (params) => {
    setUsuario(params.row);
    setDeleteModal(true);
  };
  const handleClickOpenEdit = (params) => {
    setUsuario(params.row);
    setEditModal(true);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };
  const handleCloseEdit = () => {
    setEditModal(false);
  };
  const handleAcceptAdmin = (usuarioAdmin) => {
    setUserToAdmin(usuarioAdmin);
    setEditModal(false);
  };

  const handleAcceptDelete = async (id) => {
    try {
      await deleteUser(id);
      setDeleteModal(false);
      toast.success('Usuario eliminado con éxito');
    } catch (error) {
      toast.error('Hubo un problema eliminado al usuario');
    }
  };

  const renderActions = (params) => {
    return (
      <>
        <Button
          size='small'
          sx={{ marginRight: 2 }}
          variant='contained'
          color='buttonGreen'
          onClick={() => handleClickOpenEdit(params)}
          startIcon={<HistoryIcon />}
        >
          <Typography fontWeight={600}>Editar</Typography>
        </Button>
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
    <AdminLayout title={''}>
      {isLoading && <CircularProgress />}
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '90%' }}>
          <DataGrid
            rows={userState.users}
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
              Esta acción eliminara al {usuario.nombre}
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button
              variant='contained'
              color='buttonGreen'
              onClick={() => {
                handleAcceptDelete(usuario.id);
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
      {/* MODAL EDIT */}
      {editModal && (
        <Dialog
          open={editModal}
          onClose={handleCloseEdit}
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
              Esta acción modificara a {usuario?.nombre} sus permisos de
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
            <Button
              variant='contained'
              color='buttonRed'
              onClick={handleCloseEdit}
            >
              CANCELAR
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </AdminLayout>
  );
};
