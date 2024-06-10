import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { InstrumentCardResponsive } from './InstrumentCardResponsive';

//recibe cualquir array y renderiza las cards
export const GridInstrumentosResult = ({ productos, onFavChange }) => {
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  /*useEffect(() => {
  }, [productos]);*/
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
        {productos?.map((instrument) => (
          <Grid item xs={4} sm={6} md={6} key={instrument.id}>
            <InstrumentCardResponsive
              key={instrument.id}
              instrument={instrument}
              onFavChange={handleRefresh}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
