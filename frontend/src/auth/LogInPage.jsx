import React from 'react';
import {
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Checkbox,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from './layout/AuthLayout';

/*Data para POST:
'Checkbox recuerdame' :[booleano]
*/
const label = { inputProps: { 'aria-label': 'Checkbox recuerdame' } };

export const LogInPage = () => {
  return (
    <AuthLayout title='Bienvenid@' subtitle=' ingresa al sitio'>
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
          xs={12}
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
            Ingresa
          </Typography>
          <form>
            <Grid container>
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
                  <Typography
                    fontWeight={600}
                    sx={{ mr: 1, paddingBottom: '15px' }}
                  >
                    <Checkbox {...label} />
                    Recuérdame
                  </Typography>
                  <Button variant='contained' fullWidth color='secondary'>
                    INGRESA
                  </Button>
                </Grid>
              </Grid>
              <Grid container direction='row' justifyContent='end'>
                <Typography sx={{ mr: 1 }}>¿No tienes cuenta?</Typography>
                <Link component={RouterLink} color='inherit' to='/registro'>
                  Regístrate aquí
                </Link>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
