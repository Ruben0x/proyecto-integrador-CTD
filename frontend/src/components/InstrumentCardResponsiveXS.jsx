import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, } from '@mui/material';


export const InstrumentCardResponsiveXS = ({ instrument}) => {

  const {
    id,
    nombre,
    descripcion,
    nombreCategoria,
    nombreMarca,
    precio,
    imagenes,
  } = instrument;

  const obtenerUrlImagen = () => {
    let imageUrl = '';

    if (imagenes && imagenes.length > 0) {
      imageUrl = imagenes[0];
    } else if (imagenes && imagenes[0] && imagenes[0].url) {
      imageUrl = imagenes[0].url;
    }

    if (typeof imageUrl === 'object' && imageUrl.url) {
      imageUrl = imageUrl.url;
    }
    return imageUrl;
  };

  const stripStyles = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '97%',
    height: '50px',
    backgroundColor: 'rgba(137, 137, 137, 0.7)',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        backgroundColor: 'black',
        textAlign: 'left',
        position: 'relative',
        width: '100%',
        minWidth:'100%',
        margin: '0 auto',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100%' },
          height: { xs: 'auto', md: '270px' },
          position: 'relative',
          borderRadius: 0,
          marginBottom: { xs: '0', md: '0' },
        }}
      >
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <CardMedia
              component='img'
              sx={{ width: '100%', height: '100%',objectFit: 'cover'}}
              image={obtenerUrlImagen()}
              alt='Instrumento'
              
            />
            <Box sx={stripStyles}>
              <Typography variant='h5' component='div' color={'#FFFFFF'}>
                {nombreCategoria}
              </Typography>
            </Box>
          </Box>

      </Card>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100%' },
          height: { xs: 'auto', md: '270px' },
          position: 'relative',
          backgroundColor: '#121312',
          borderRadius: 0,
          marginTop: { xs: '0', md: '0' }, // Sin margen en vista móvil
        }}
      >
        <CardContent sx={{ flex: '1 0 auto', color: 'white' }}>
          <Typography
            component='div'
            variant='h5'
            fontWeight='bold'
            color='primary'
          >
            {nombreMarca}
          </Typography>
          <Typography variant='h6' color='white' component='div' paddingY={1}>
            {nombre}
          </Typography>
          <Typography
            variant='h5'
            color='primary'
            component='div'
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            ${precio} <Typography color='white'> /diario</Typography>
          </Typography>
          <Typography color='white' pt={1} variant='subtitle2'>
            {descripcion}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
