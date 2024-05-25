import { Grid, Typography } from '@mui/material';
import { AuthLayout } from './layout/AuthLayout';
import { RegisterForm } from './components/RegisterForm';

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
          <RegisterForm />
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
