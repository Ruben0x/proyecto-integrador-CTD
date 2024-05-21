import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';

export const RegisterPage = () => {
  return (
    <AuthLayout title='Regístrate' subtitle='Y reserva ahora'>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
      >
        <Grid
          item
          className='box-shadow'
          xs={3}
          sx={{
            width: { sm: 450 },
            backgroundColor: 'white',
            borderRadius: 2,
            padding: 3,
          }}
        >
          <Typography
            variant='h5'
            textTransform={'uppercase'}
            sx={{ mb: 1, textAlign: 'center' }}
          >
            Registrar nuevo usuario
          </Typography>
          <form>
            <Grid container>
              <Grid item xs={6} sx={{ mt: 2, pr: 1 }}>
                <TextField
                  label='Nombre'
                  type='text'
                  placeholder='Nombre'
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sx={{ mt: 2 }}>
                <TextField
                  label='Apellido'
                  type='text'
                  placeholder='Apellido'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label='Correo'
                  type='email'
                  placeholder='correo@google.com'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label='Contraseña'
                  type='password'
                  placeholder='Contraseña'
                  fullWidth
                />
              </Grid>
              <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                <Grid item xs={12}>
                  <Button variant='contained' fullWidth color='secondary'>
                    Crear cuenta
                  </Button>
                </Grid>
              </Grid>
              <Grid container direction='row' justifyContent='end'>
                <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                <Link component={RouterLink} color='inherit' to='/auth/login'>
                  Ingresa aquí
                </Link>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
