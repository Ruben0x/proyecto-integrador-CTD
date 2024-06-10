import React, { useContext } from 'react';
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
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { login } from './helpers/login';
import { GlobalUserDataContext } from './helpers/globalUserData';
import { ItemsContext } from '../context/ItemsContext';
import { useUsers } from '../context/store/UsersProvider';

/*Data para POST:
'Checkbox recuerdame' :[booleano]
*/
const label = { inputProps: { 'aria-label': 'Checkbox recuerdame' } };

export const LogInPage = () => {
  const { getUserById } = useContext(ItemsContext);
  const { setIsLogged, setGlobalUserData } = useContext(GlobalUserDataContext);

  const { userLogin, isLoading } = useUsers();
  const validationSchema = Yup.object({
    email: Yup.string('Ingrese su correo')
      .email('Correo Invalido')
      .required('Correo es obligatorio'),
    password: Yup.string('Ingrese su contraseña').required(
      'Debe ingresar una contraseña'
    ),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberme: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values, setIsLogged, setGlobalUserData, getUserById);
    },
  });
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
          <form onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  id='email'
                  name='email'
                  label='Correo'
                  type='email'
                  placeholder='correo@google.com'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  id='password'
                  name='password'
                  label='Contraseña'
                  type='password'
                  placeholder='Contraseña'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  fullWidth
                />
              </Grid>
              <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={600}
                    sx={{ mr: 1, paddingBottom: '15px' }}
                  >
                    <Checkbox
                      {...label}
                      id='rememberme'
                      name='rememberme'
                      value={formik.values.rememberme}
                      onChange={formik.handleChange}
                    />
                    Recuerdame
                  </Typography>
                  <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    color='secondary'
                  >
                    INGRESA
                  </Button>
                </Grid>
              </Grid>
              <Grid container direction='row' justifyContent='end'>
                <Typography sx={{ mr: 1 }}>¿No tienes cuenta?</Typography>
                <Link
                  component={RouterLink}
                  color='inherit'
                  to='/auth/registro'
                >
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
