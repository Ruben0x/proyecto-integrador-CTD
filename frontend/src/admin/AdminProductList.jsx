import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Container, dividerClasses } from '@mui/material';
import { useContext } from 'react';
import { ItemsContext } from '../context/ItemsContext';
import axios from 'axios';
import { useState } from 'react';
import { AddProductForm } from './AddProductForm';

export const AdminProductList = ({}) => {
  const { itemState, deleteProductbyId } = useContext(ItemsContext);
  const [item, setItem] = useState('');
  const [editView, setEditView] = useState(false);

  const editProduct = (param) => {
    setItem(param.row);
    setEditView(true);
  };

  return (
    <>
      {!editView ? (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '90%' }}>
            <DataGrid
              rows={itemState.items}
              columns={[
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'nombre', headerName: 'Nombre', width: 180 },
                { field: 'descripcion', headerName: 'Descripcion', width: 200 },
                {
                  field: 'acciones',
                  headerName: 'Acciones',
                  width: 250,
                  renderCell: (params) => {
                    return (
                      <>
                        <Button onClick={() => deleteProductbyId(params.id)}>
                          Eliminar
                        </Button>
                        <Button onClick={() => editProduct(params)}>
                          Editar
                        </Button>
                      </>
                    );
                  },
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
          <Button sx={{ marginBottom: 5 }} onClick={() => setEditView(false)}>
            Cancelar
          </Button>
          <AddProductForm item={item} />
        </>
      )}
    </>
  );
};
