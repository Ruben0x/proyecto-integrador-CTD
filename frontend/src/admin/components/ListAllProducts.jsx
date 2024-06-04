import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
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
import { useContext } from 'react';
import { ItemsContext } from '../../context/ItemsContext';
import { useState } from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { toast } from 'sonner';
import { AdminLayout } from '../layout/AdminLayout';
import WestIcon from '@mui/icons-material/West';
import HistoryIcon from '@mui/icons-material/History';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { AddProductFormcopy } from './AddProductFormcopy';

export const ListAllProducts = ({}) => {
  const { itemState, deleteProductbyId } = useContext(ItemsContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [item, setItem] = useState('');
  const [editView, setEditView] = useState(false);

  const handleClickOpen = (params) => {
    setItem(params.row);
    setDeleteModal(true);
  };
  const handleAcceptDelete = (id) => {
    deleteProductbyId(id).then((res) => {
      if (res) {
        toast.success('Producto eliminado con éxito');
        // getAllItems();
        setDeleteModal(false);
      } else {
        console.log('ERROR');
      }
    });
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  const handleEditProduct = (param) => {
    setItem(param.row);
    setEditView(true);
  };
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
              rows={itemState.items}
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
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
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
          <AddProductFormcopy item={item} />
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
