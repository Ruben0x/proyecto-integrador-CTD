import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
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
    marca: Yup.string('Ingrese la Marca del producto')
      .min(2, 'Mínimo 2 caracteres')
      .max(20, 'Máximo 20 caracteres')
      .required('Marca es obligatorio'),
    categoria: Yup.string('Ingrese la categoría').required(
      'Debe seleccionar una categoría'
    ),
    descripcion: Yup.string('Ingrese descripción del producto').required(
      'El producto debe tener una descripción'
    ),
    precio: Yup.number('Ingrese precio')
      .typeError('El precio debe estar en números')
      .required('Debe ingresar un precio')
      .min(0, 'El precio no puede ser menor a 0'),
    imagen: Yup.mixed().required('Required!'),
  });

  const formik = useFormik({
    initialValues: {
      nombre: '',
      descripcion: '',
      marcaId: '',
      categoriaId: '',
      precio: '',
      imagenes: '',
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
        <TextField
          id='marca'
          name='marca'
          label='Marca'
          value={formik.values.marca}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.marca && Boolean(formik.errors.marca)}
          helperText={formik.touched.marca && formik.errors.marca}
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
            error={formik.touched.categoria && Boolean(formik.errors.categoria)}
          >
            <MenuItem value={'cuerda'}>Cuerda</MenuItem>
            <MenuItem value={'viento'}>Viento</MenuItem>
            <MenuItem value={'percusion'}>Percusión</MenuItem>
            <MenuItem value={'teclado'}>Teclado</MenuItem>
            <MenuItem value={'electronicos'}>Electrónicos</MenuItem>
          </Select>
          {!!formik.errors.categoria && (
            <FormHelperText id='precio-error' sx={{ color: 'red' }}>
              {formik.touched.categoria && formik.errors.categoria}
            </FormHelperText>
          )}
        </FormControl>
        <TextField
          id='descripcion'
          name='descripcion'
          label='Descripción'
          value={formik.values.descripcion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.descripcion && Boolean(formik.errors.descripcion)
          }
          helperText={formik.touched.descripcion && formik.errors.descripcion}
        />

        <FormControl>
          <InputLabel
            htmlFor='outlined-adornment-amount'
            // sx={formik.errors.precio ? { color: 'red' } : ''}
            sx={{ ...(formik.errors.precio && { color: 'red' }) }}
          >
            Precio
          </InputLabel>
          <OutlinedInput
            id='precio'
            name='precio'
            label='Precio'
            value={formik.values.precio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.precio && Boolean(formik.errors.precio)}
            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          />
          {!!formik.errors.precio && (
            <FormHelperText id='precio-error' sx={{ color: 'red' }}>
              {formik.touched.precio && formik.errors.precio}
            </FormHelperText>
          )}
        </FormControl>

        {/* UPLOAD IMAGE */}
        <FormControl>
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
