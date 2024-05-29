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
import React, { useContext } from 'react';
import { ItemsContext } from '../../context/ItemsContext';

export const TableLastUsers = () => {
  const { itemState } = useContext(ItemsContext);
  console.log(itemState.usuarios);

  const usuarios = itemState.usuarios;

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
            {usuarios.map((row) => (
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
