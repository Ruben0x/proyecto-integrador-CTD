import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, CircularProgress, Container } from '@mui/material';
import { ItemsContext } from '../../context/ItemsContext';
import { useEffect, useContext } from 'react';
import { AdminLayout } from '../layout/AdminLayout';
import { useState } from 'react';

export const ListAllUsuarios = ({}) => {
  const { itemState, getAllUsuarios } = useContext(ItemsContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        await getAllUsuarios();
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, [getAllUsuarios]);

  if (loading) return <CircularProgress />;
  if (error) return <div>Error loading data: {error.message}</div>;

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
                //   renderCell: renderActions,
              },
              { field: 'rol', headerName: 'Rol', width: 100 },
              {
                field: 'accions',
                headerName: 'Acciones',
                width: 250,
                //   renderCell: renderActions,
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
    </AdminLayout>
  );
};
