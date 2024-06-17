import { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';
import { InstrumentCardResponsive } from './InstrumentCardResponsive';
import { userProductos } from '../context/store/ProductosProvider';
import { useUsers } from '../context/store/UsersProvider';

export const GridInstrumentos = () => {
  const { userState } = useUsers();
  const accessToken = userState.token.accessToken;
  const loggedToken = sessionStorage.getItem('token');

  const { getProductosRandoms, productoState, isLoading } = userProductos();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const token = loggedToken || accessToken;
    if (token) {
      getProductosRandoms(token);
    }
  }, []);

  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Toggle refresh state
  };

  if (isLoading) return <CircularProgress />;

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
              instrument={instrument}
              onFavChange={handleRefresh}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
