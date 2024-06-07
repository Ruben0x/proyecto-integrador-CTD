import React, { useContext, useEffect, useState } from 'react';
import { ItemsContext } from '../context/ItemsContext';
import { Box, Grid } from '@mui/material';
import { InstrumentCardResponsive } from './InstrumentCardResponsive';
import { userProductos } from '../context/store/ProductosProvider';
import { useUsers } from '../context/store/UsersProvider';

export const GridInstrumentos = () => {
  // const { itemState } = useContext(ItemsContext);
  // const [productos, setProductos] = useState([]);
  const { userState } = useUsers();

  const accessToken = userState.token.accessToken;

  const { getProductosRandoms, productoState } = userProductos();

  useEffect(() => {
    getProductosRandoms(accessToken);
  }, []);

  // useEffect(() => {
  //   if (itemState.itemsRandoms) {
  //     setProductos(itemState.itemsRandoms);
  //   }
  // }, [itemState]);
  return (
    <Box
      pt={4}
      sx={{
        flexGrow: 1,
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent={'center'}
      >
        {productoState.productosRandoms.map((instrument) => (
          <Grid item xs={4} sm={6} md={6} key={instrument.id}>
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
