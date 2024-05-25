import { Grid, Typography } from '@mui/material';
import React from 'react';

export const AdminLayout = ({ children, title }) => {
  return (
    <Grid sx={{ height: '100%', backgroundColor: 'background.main' }}>
      <Typography variant='h4' sx={{ pb: 3, textAlign: 'center' }}>
        {title}
      </Typography>
      {children}
    </Grid>
  );
};
