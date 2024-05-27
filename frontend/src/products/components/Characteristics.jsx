import { Box, Container, Grid, Typography } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ScaleIcon from '@mui/icons-material/Scale';
import StraightenIcon from '@mui/icons-material/Straighten';
import DoneIcon from '@mui/icons-material/Done';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ConstructionIcon from '@mui/icons-material/Construction';
import TuneIcon from '@mui/icons-material/Tune';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
export const Characteristics = () => {
  return (
    <Box sx={{ backgroundColor: 'background.main', padding: 3 }}>
      <Grid container columns={{ xs: 1, sm: 12 }} rowSpacing={2}>
        <Grid item xs={12} sm={6} paddingLeft={4} sx={{ display: 'flex' }}>
          <QueueMusicIcon />
          <Typography paddingLeft={2}>TIPO DE INSTRUMENTO</Typography>
        </Grid>
        <Grid item xs={12} sm={6} paddingLeft={4} sx={{ display: 'flex' }}>
          <ColorLensIcon /> <Typography paddingLeft={2}>COLOR</Typography>
        </Grid>
        <Grid item xs={12} sm={6} paddingLeft={4} sx={{ display: 'flex' }}>
          <ScaleIcon /> <Typography paddingLeft={2}>PESO</Typography>
        </Grid>
        <Grid item xs={12} sm={6} paddingLeft={4} sx={{ display: 'flex' }}>
          <StraightenIcon />{' '}
          <Typography paddingLeft={2}>DIMENSIONES</Typography>
        </Grid>
        <Grid item xs={12} sm={6} paddingLeft={4} sx={{ display: 'flex' }}>
          <ConstructionIcon /> <Typography paddingLeft={2}>MATERIAL</Typography>
        </Grid>
        <Grid item xs={12} sm={6} paddingLeft={4} sx={{ display: 'flex' }}>
          <TuneIcon /> <Typography paddingLeft={2}>CONTROLES</Typography>
        </Grid>
        <Grid item xs={12} sm={6} paddingLeft={4} sx={{ display: 'flex' }}>
          <AttachFileIcon /> <Typography paddingLeft={2}>INCLUYE</Typography>
        </Grid>
        <Grid item xs={12} sm={6} paddingLeft={4} sx={{ display: 'flex' }}>
          <DoneIcon /> <Typography paddingLeft={2}> CONDICION</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
