import {
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

export const TableLastProducts = () => {
  const { itemState } = useContext(ItemsContext);

  const productos = itemState.items.reverse();
  return (
    <>
      <Typography variant='h5' textAlign={'center'}>
        Últimos Productos
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: '95%' }}>
        <Table sx={{ minWidth: 300 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align='left'>Nombre</TableCell>
              <TableCell align='left'>Categoría</TableCell>
              <TableCell align='left'>Marca</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.id}
                </TableCell>
                <TableCell align='left'>{row.nombre}</TableCell>
                <TableCell align='left'>{row.nombreCategoria}</TableCell>
                <TableCell align='left'>{row.nombreMarca}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
