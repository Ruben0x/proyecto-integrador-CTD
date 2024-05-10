import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';

export const AddProductForm = () => {
  const validationSchema = Yup.object({
    nombreProducto: Yup.string('Ingrese el Nombre del producto')
      .min(2, 'Mínimo 2 caracteres')
      .max(20, 'Máximo 20 caracteres')
      .required('Nombre es obligatorio'),
    descripcion: Yup.string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    imagen: Yup.mixed().required('Required!'),
  });

  const formik = useFormik({
    initialValues: {
      nombreProducto: '',
      categoria: '',
      descripcion: '',
      precio: '',
      imagen: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <TextField
          id='nombreProducto'
          name='nombreProducto'
          label='Nombre Producto'
          value={formik.values.nombreProducto}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.nombreProducto &&
            Boolean(formik.errors.nombreProducto)
          }
          helperText={
            formik.touched.nombreProducto && formik.errors.nombreProducto
          }
        />
        <FormControl fullWidth>
          <InputLabel>Categoría</InputLabel>
          <Select
            id='categoria'
            name='categoria'
            label='Categoría'
            value={formik.values.categoria}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <MenuItem value={'guitarra'}>Guitarra</MenuItem>
            <MenuItem value={'piano'}>Piano</MenuItem>
            <MenuItem value={'bateria'}>Bateria</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id='descripcion'
          name='descripcion'
          label='Descripción'
          type='descripcion'
          value={formik.values.descripcion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.descripcion && Boolean(formik.errors.descripcion)
          }
          helperText={formik.touched.descripcion && formik.errors.descripcion}
        />
        <FormControl fullWidth>
          <InputLabel htmlFor='precio'>Precio</InputLabel>
          <OutlinedInput
            id='precio'
            name='precio'
            label='Precio'
            type='precio'
            value={formik.values.precio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          />
        </FormControl>
        {/* UPLOAD IMAGE */}
        <FormControl>
          {/* <OutlinedInput
            id='imagen'
            name='imagen[]'
            type='file'
            accept='image/*'
            multiple
            //   onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onChange={(e) =>
              formik.setFieldValue('imagen', e.currentTarget.files[0])
            }
          ></OutlinedInput> */}
          <input
            type='file'
            multiple
            id='imagen'
            name='imagen[]'
            accept='image/*'
            onBlur={formik.handleBlur}
            onChange={(e) =>
              formik.setFieldValue('imagen', e.currentTarget.files)
            }
          />
        </FormControl>
        {/* UPLOAD IMAGE */}
        <Button color='primary' variant='contained' fullWidth type='submit'>
          Submit
        </Button>
      </Container>
    </form>
  );
};
