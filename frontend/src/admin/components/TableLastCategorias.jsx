import React from 'react';

export const TableLastCategorias = () => {
  return (
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
  );
};
