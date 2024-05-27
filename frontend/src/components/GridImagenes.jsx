import * as React from 'react';

import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Grid } from '@mui/material';

export const GridImagenes = ({ listaImagenes }) => {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    setImagenes(listaImagenes);
  }, [listaImagenes]);

  const renderImages = useMemo(() => {
    if (!imagenes || imagenes.length === 0) return null;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img style={{ width: '100%' }} src={imagenes[0].url} alt='' />
        </Grid>
        <Grid item xs={12} md={6} sm container>
          <Grid item xs={12} md={6}>
            <Grid item>
              <Grid item xs={12}>
                {imagenes[1].url && (
                  <img style={{ width: '100%' }} src={imagenes[1].url} alt='' />
                )}
              </Grid>
              <Grid item xs={12}>
                {imagenes[2] && (
                  <img style={{ width: '100%' }} src={imagenes[2].url} alt='' />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} sm container>
            <Grid item>
              <Grid item xs={12}>
                {imagenes[3] && (
                  <img style={{ width: '100%' }} src={imagenes[3].url} alt='' />
                )}
              </Grid>
              <Grid item xs={12}>
                {imagenes[4] && (
                  <img style={{ width: '100%' }} src={imagenes[4].url} alt='' />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }, [imagenes]);
  return <>{renderImages}</>;
};
