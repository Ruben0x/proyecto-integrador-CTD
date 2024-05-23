import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createUser } from './createUser';

export const RegisterForm = () => {
  const validationSchema = Yup.object({
    nombre: Yup.string('Ingrese su Nombre')
      .min(2, 'Mínimo 2 caracteres')
      .max(30, 'Máximo 30 caracteres')
      .required('Nombre es obligatorio'),
    apellido: Yup.string('Ingrese su Apellido')
      .min(2, 'Mínimo 2 caracteres')
      .max(30, 'Máximo 30 caracteres')
      .required('Apellido es obligatorio'),
    email: Yup.string('Ingrese su correo')
      .email('Correo Invalido')
      .required('Correo es obligatorio'),
    password: Yup.string('Ingrese su contraseña').required(
      'Debe ingresar una contraseña'
    ),
  });

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createUser(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item xs={6} sx={{ mt: 2, pr: 1 }}>
          <TextField
            id='nombre'
            name='nombre'
            label='Nombre'
            value={formik.values.nombre}
            placeholder='Nombre'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sx={{ mt: 2 }}>
          <TextField
            id='apellido'
            name='apellido'
            label='Apellido'
            type='apellido'
            placeholder='Apellido'
            value={formik.values.apellido}
            // placeholder='Nombre'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.apellido && Boolean(formik.errors.apellido)}
            helperText={formik.touched.apellido && formik.errors.apellido}
            fullWidth
          />
        </Grid>
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
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
          />
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12}>
            <Button
              variant='contained'
              fullWidth
              color='secondary'
              type='submit'
            >
              Registrarme
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
  );
};
