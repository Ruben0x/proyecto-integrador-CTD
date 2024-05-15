import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { instrumentos } from '../assets/utils';
import { Box, Container } from '@mui/material';
import { useContext } from 'react';
import { ItemsContext } from '../../context/ItemsContext';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nombre', headerName: 'Nombre', width: 180 },
  { field: 'descripcion', headerName: 'Descripcion', width: 180 },
  { field: 'acciones', headerName: 'Acciones', width: 130 },
];

export const AdminProductList = ({}) => {
  const { itemState } = useContext(ItemsContext);

  console.log(itemState);

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '90%' }}>
        <DataGrid
          rows={itemState.items}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>
    </Container>
  );
};
