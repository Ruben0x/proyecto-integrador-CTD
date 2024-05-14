import { Box, Container, List, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { GridImagenes } from '../components/GridImagenes';

export const ProductPage = ({ item }) => {
  return (
    <>
      <Container>
        <Box sx={{ margin: 2 }}>
          <Typography variant='h3' sx={{ color: '#ff5000', fontWeight: '600' }}>
            GIBSON <span style={{ color: '#000000' }}> LES PAUL CLASSIC</span>
          </Typography>
          <GridImagenes />
          <Box sx={{ padding: 2, backgroundColor: '#000000', color: 'white' }}>
            <Typography variant='h4' color='primary'>
              {' '}
              Gibson{' '}
            </Typography>
            <Typography variant='subtitle1' py={1}>
              Descripcion
            </Typography>
            <Typography variant='h5' color='primary' py={1}>
              $18000 <span style={{ color: 'white' }}>/diario</span>
            </Typography>

            <List>
              <ListItemText primary='Lorem: Impsum' />
              <ListItemText primary='Lorem: Impsum' />
              <ListItemText primary='Lorem: Impsum' />
              <ListItemText primary='Lorem: Impsum' />
              <ListItemText primary='Lorem: Impsum' />
              <ListItemText primary='Lorem: Impsum' />
            </List>
          </Box>
        </Box>
      </Container>
    </>
  );
};
