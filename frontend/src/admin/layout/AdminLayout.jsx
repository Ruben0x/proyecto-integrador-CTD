import { Grid } from '@mui/material';
import React from 'react';

export const AdminLayout = ({ children }) => {
  return (
    <Grid sx={{ height: '100%', backgroundColor: 'background.main' }}>
      {children}
    </Grid>
  );
};
