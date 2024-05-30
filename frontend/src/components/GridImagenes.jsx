import { useMemo, useState, useEffect } from 'react';

import { Grid } from '@mui/material';

export const GridImagenes = ({ listaImagenes = [] }) => {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    setImagenes(listaImagenes);
  }, [listaImagenes]);

  const renderImages = useMemo(() => {
    if (!imagenes || imagenes.length === 0) return null;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {imagenes[0] && (
            <img style={{ width: '100%' }} src={imagenes[0].url} alt='' />
          )}
        </Grid>
        <Grid item xs={12} md={6} sm container>
          {imagenes.slice(1, 5).map((imagen, index) => (
            <Grid item xs={12} md={6} key={index}>
              <img style={{ width: '100%' }} src={imagen?.url || ''} alt='' />
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }, [imagenes]);
  return <>{renderImages}</>;
};
