import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { AuthLayout } from './layout/AuthLayout';
import { useContext, useEffect, useState } from 'react';
import { GlobalUserDataContext } from './helpers/globalUserData';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { logout } from './helpers/login';
import LogoutIcon from '@mui/icons-material/Logout';
import { ItemsContext } from '../context/ItemsContext';
import { TableAllFavs } from './components/TableAllFavs';

export const UserInfoPage = () => {
  const { isLogged, globalUserData } = useContext(GlobalUserDataContext);
  const { itemState } = useContext(ItemsContext);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    //este codigo redirige a 'login' cuando intenta ir a /user sin loggear
    if (!isLogged) {
      window.location.replace('/auth/login');
    }
    //este codigo solo par completar seccion ultimas reservas con rndoms
    if (itemState.itemsRandoms) {
      setProductos(itemState.itemsRandoms);
    }
  }, [isLogged, itemState]);
  if (productos === undefined) {
    return <div>Loading...</div>;
  }

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
      nombre: globalUserData.nombre || '',
      apellido: globalUserData.apellido || '',
      email: globalUserData.email || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <AuthLayout
      title='Hola de nuevo!'
      subtitle={`${globalUserData.nombre} ${globalUserData.apellido}`}
    >
      <Grid direction='row' container justifyContent={'center'} gap={3}>
        <Grid
          item
          sx={{ backgroundColor: 'background.main', minWidth: 400 }}
          padding={5}
          borderRadius={5}
          sm={3}
        >
          <Stack
            direction='column'
            spacing={2}
            sx={{ alignItems: 'center', maxWidth: '500px' }}
          >
            <Grid
              container
              direction='row'
              alignItems='center'
              justifyContent='center'
            >
              <Badge
                overlap='circular'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <BorderColorIcon
                    fontSize='small'
                    sx={{ bgcolor: 'white', borderRadius: '50%' }}
                  />
                }
              >
                <Avatar sx={{ width: 60, height: 60 }}>
                  <AccountCircleIcon fontSize='large' />
                </Avatar>
              </Badge>

              <Box>
                <Typography fontWeight={600}>
                  {globalUserData.nombre} {globalUserData.apellido}
                </Typography>
                <Typography>{globalUserData.email}</Typography>
              </Box>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
              <Grid container alignItems='center' justifyContent='center'>
                <Grid item xs={12} md={6} sx={{ mt: 2 }}>
                  <TextField
                    id='nombre'
                    name='nombre'
                    label='Nombre'
                    type='nombre'
                    placeholder='Portal'
                    value={formik.values.nombre || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.nombre && Boolean(formik.errors.nombre)
                    }
                    helperText={formik.touched.nombre && formik.errors.nombre}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} sx={{ mt: 2 }}>
                  <TextField
                    id='apellido'
                    name='apellido'
                    label='Apellido'
                    type='apellido'
                    placeholder='Portal'
                    value={formik.values.apellido || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.apellido && Boolean(formik.errors.apellido)
                    }
                    helperText={
                      formik.touched.apellido && formik.errors.apellido
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12} sx={{ mt: 2 }}>
                  <TextField
                    id='email'
                    name='email'
                    label='Correo'
                    type='email'
                    placeholder='correo@google.com'
                    value={formik.values.email || ''}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Button
                  type='submit'
                  variant='contained'
                  fullWidth
                  color='secondary'
                  sx={{ mt: 2 }}
                >
                  GUARDAR CAMBIOS
                </Button>
              </Grid>
            </form>

            <Button
              variant='contained'
              color='terceario'
              onClick={logout}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                borderRadius: 70,
                fontSize: '.5rem',
                marginLeft: '0.5rem',
                alignContent: 'center',
              }}
            >
              <LogoutIcon /> Salir
            </Button>
          </Stack>
        </Grid>

        <Grid
          item
          sx={{ backgroundColor: 'background.main', minWidth: 400 }}
          padding={5}
          borderRadius={5}
          sm={6}
        >
          <TableAllFavs />
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
