import React from 'react';
import { AdminLayout } from '../layout/AdminLayout';
import { Grid } from '@mui/material';
import { TableLastUsers } from '../components/TableLastUsers';
import { TableLastProducts } from '../components/TableLastProducts';

export const AdminHomePage = () => {
  return (
    <AdminLayout>
      <Grid
        container
        sx={{ width: '100%', marginLeft: 0 }}
        columns={{ xs: 1, sm: 12 }}
        spacing={2}
      >
        <Grid item xs={12} sm={6}>
          <TableLastProducts />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TableLastUsers />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TableLastUsers />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TableLastUsers />
        </Grid> */}
      </Grid>
    </AdminLayout>
  );
};
