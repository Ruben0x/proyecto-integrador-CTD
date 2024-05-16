import React, { useContext, useEffect, useState } from 'react';
import { ItemsContext } from '../context/ItemsContext';
import { Box, Grid } from '@mui/material';
import { InstrumentCard } from './InstrumentCard';
import { InstrumentCardResponsive } from './InstrumentCardResponsive';

export const GridInstrumentos = () => {
  const { itemState } = useContext(ItemsContext);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(itemState.items);
  }, [itemState]);
  return (
    <Box pt={4} sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {productos.map((instrument, index) => (
          <Grid item xs={4} sm={6} md={6} key={index}>
            <InstrumentCardResponsive
              key={instrument.id}
              instrument={instrument}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
