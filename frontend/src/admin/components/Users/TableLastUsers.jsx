import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useUsers } from '../../../context/store/UsersProvider';

export const TableLastUsers = () => {
  const { getAllUsers, isLoading, userState } = useUsers();

  useEffect(() => {
    getAllUsers();
  }, []);

  if (isLoading) return 'Cargando...';

  return (
    <>
      <Typography variant='h5' textAlign={'center'}>
        Últimos Usuarios
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: '95%' }}>
        <Table sx={{ minWidth: 300 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align='left'>Nombre</TableCell>
              <TableCell align='left'>Apellido</TableCell>
              <TableCell align='left'>Email</TableCell>
              <TableCell align='left'>Rol</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userState.users.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.id}
                </TableCell>
                <TableCell align='left'>{row.nombre}</TableCell>
                <TableCell align='left'>{row.apellido}</TableCell>
                <TableCell align='left'>{row.email}</TableCell>
                <TableCell align='left'>{row.rol}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
