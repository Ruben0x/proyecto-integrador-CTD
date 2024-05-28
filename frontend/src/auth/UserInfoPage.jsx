import { Avatar, Box, Grid, Stack, TextField, Typography } from '@mui/material';
import { AuthLayout } from './layout/AuthLayout';
import { useContext } from 'react';
import { GlobalUserDataContext } from './helpers/globalUserData';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const UserInfoPage = () => {
  const { isLogged, globalUserData } = useContext(GlobalUserDataContext);

  console.log(globalUserData);
  return (
    <AuthLayout
      title='Hola de nuevo!'
      subtitle={`${globalUserData.nombre} ${globalUserData.apellido}`}
    >
      <Grid container justifyContent={'center'}>
        <Grid
          item
          sx={{ backgroundColor: 'background.main' }}
          padding={5}
          borderRadius={5}
        >
          <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
            <Avatar sx={{ width: 56, height: 56 }}>
              <AccountCircleIcon fontSize='large' />
            </Avatar>
            <Box>
              <Typography fontWeight={600}>
                {globalUserData.nombre} {globalUserData.apellido}
              </Typography>
              <Typography>{globalUserData.email}</Typography>
            </Box>
          </Stack>
          {/* <form action=''>
            <TextField id='nombre' name='nombre' label='Nombre Producto' />
            <TextField
              id='descripcion'
              name='descripcion'
              label='Descripción'
            />
          </form> */}
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
