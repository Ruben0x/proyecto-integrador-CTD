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
import { useEffect } from 'react';
import { useState } from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { AdminLayout } from '../../layout/AdminLayout';
import WestIcon from '@mui/icons-material/West';
import HistoryIcon from '@mui/icons-material/History';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { AddProductForm } from './AddProductForm';
import { userProductos } from '../../../context/store/ProductosProvider';

export const ListAllProducts = ({}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [item, setItem] = useState('');
  const [editView, setEditView] = useState(false);

  const loggedToken = sessionStorage.getItem('token');
  const { getAllProducts, isLoading, productoState, deleteProducto } =
    userProductos();
  useEffect(() => {
    getAllProducts(loggedToken);
  }, []);

  const handleClickOpen = (params) => {
    setItem(params.row);
    setDeleteModal(true);
  };

  const handleAcceptDelete = (id) => {
    deleteProducto(id);
    setDeleteModal(false);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  const handleEditProduct = (param) => {
    setItem(param.row);
    setEditView(true);
  };

  if (isLoading) return <CircularProgress />;

  const renderActions = (params) => {
    return (
      <>
        <Button
          size='small'
          sx={{ marginRight: 2 }}
          variant='contained'
          color='buttonGreen'
          onClick={() => handleEditProduct(params)}
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
    <AdminLayout>
      {!editView ? (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '90%' }}>
            <DataGrid
              rows={productoState.todosProductos}
              columns={[
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'nombre', headerName: 'Nombre', width: 180 },
                {
                  field: 'nombreMarca',
                  headerName: 'Marca',
                  width: 100,
                },
                {
                  field: 'nombreCategoria',
                  headerName: 'Categoría',
                  width: 100,
                },
                { field: 'descripcion', headerName: 'Descripcion', width: 200 },
                {
                  field: 'acciones',
                  headerName: 'Acciones',
                  width: 280,
                  renderCell: renderActions,
                },
              ]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20]}
              // checkboxSelection
            />
          </Box>
        </Container>
      ) : (
        <>
          <Button
            startIcon={<WestIcon />}
            sx={{ marginBottom: 5 }}
            onClick={() => setEditView(false)}
          >
            Volver al listado de productos
          </Button>
          <AddProductForm item={item} />
        </>
      )}
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
              Esta acción NO es reversible
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button
              variant='contained'
              color='buttonGreen'
              onClick={() => {
                handleAcceptDelete(item.id);
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
    </AdminLayout>
  );
};
