import { CardMedia, Container, Typography } from '@mui/material';
import imgError from '../assets/img/Error404.jpeg';

export const ErrorAdmin = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 5,
      }}
    >
      <Typography variant='h5' color='primary' align='center' py={5}>
        Lo sentimos, el panel de Administración no está disponible en
        dispositivos móviles.
      </Typography>

      <CardMedia
        component='img'
        sx={{ width: 300, height: 250 }}
        image={imgError}
        alt='Error vista administación'
      />
    </Container>
  );
};
