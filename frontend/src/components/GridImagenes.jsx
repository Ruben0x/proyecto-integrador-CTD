import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import placeholder from '../assets/placeholder.png';
import { Grid } from '@mui/material';

function srcset(image, size, rows = 4, cols = 4) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const GridImagenes = ({ listaImagenes }) => {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    setImagenes(listaImagenes);
  }, [listaImagenes]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img style={{ width: '100%' }} src={imagenes[0]} alt='' />
        </Grid>
        <Grid item xs={12} md={6} sm container>
          <Grid item xs={12} md={6}>
            <Grid item>
              <Grid item xs={12}>
                <img style={{ width: '100%' }} src={imagenes[1]} alt='' />
              </Grid>
              <Grid item xs={12}>
                <img style={{ width: '100%' }} src={imagenes[2]} alt='' />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} sm container>
            <Grid item>
              <Grid item xs={12}>
                <img style={{ width: '100%' }} src={imagenes[3]} alt='' />
              </Grid>
              <Grid item xs={12}>
                <img style={{ width: '100%' }} src={imagenes[4]} alt='' />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
