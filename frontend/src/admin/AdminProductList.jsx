import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { instrumentos } from '../assets/utils';
import { Box, Container } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nombre', headerName: 'Nombre', width: 130 },
  { field: 'acciones', headerName: 'Acciones', width: 130 },
];

export const AdminProductList = ({}) => {
  instrumentos;

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '70%' }}>
        <DataGrid
          rows={instrumentos}
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
