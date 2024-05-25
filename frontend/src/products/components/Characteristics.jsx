import { Box, Container, Grid, Typography } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';
export const Characteristics = () => {
  return (
    <Box sx={{ backgroundColor: 'background.main', padding: 3 }}>
      <Grid container columns={{ xs: 1, sm: 12 }} rowSpacing={2}>
        <Grid item xs={12} sm={6} paddingLeft={4} sx={{ display: 'flex' }}>
          <ColorLensIcon />
          <Typography>TIPO DE INSTRUMENTO</Typography>
        </Grid>
        <Grid item xs={12} sm={6} paddingLeft={4} sx={{ display: 'flex' }}>
          <ColorLensIcon /> <Typography>COLOR</Typography>
        </Grid>
        <Grid item xs={12} sm={6} paddingLeft={4} sx={{ display: 'flex' }}>
          <ColorLensIcon /> <Typography>PESO</Typography>
        </Grid>
        <Grid item xs={12} sm={6} paddingLeft={4} sx={{ display: 'flex' }}>
          <ColorLensIcon /> <Typography>DIMENSIONES</Typography>
        </Grid>
        <Grid item xs={12} sm={6} paddingLeft={4} sx={{ display: 'flex' }}>
          <ColorLensIcon /> <Typography>MATERIAL</Typography>
        </Grid>
        <Grid item xs={12} sm={6} paddingLeft={4} sx={{ display: 'flex' }}>
          <ColorLensIcon /> <Typography>CONTROLES</Typography>
        </Grid>
        <Grid item xs={12} sm={6} paddingLeft={4} sx={{ display: 'flex' }}>
          <ColorLensIcon /> <Typography>INCLUYE</Typography>
        </Grid>
        <Grid item xs={12} sm={6} paddingLeft={4} sx={{ display: 'flex' }}>
          <ColorLensIcon /> <Typography>CONDICION</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
