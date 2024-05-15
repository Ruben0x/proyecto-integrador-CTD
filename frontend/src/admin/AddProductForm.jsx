import React, { useContext, useEffect, useState } from 'react';
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
import { ItemsContext } from '../context/ItemsContext';
import axios from 'axios';

export const AddProductForm = () => {
  const { postCreateItem } = useContext(ItemsContext);

  const validationSchema = Yup.object({
    nombre: Yup.string('Ingrese el Nombre del producto')
      .min(2, 'Mínimo 2 caracteres')
      .max(20, 'Máximo 20 caracteres')
      .required('Nombre es obligatorio'),
    marcaId: Yup.string('Ingrese la Marca del producto').required(
      'Marca es obligatorio'
    ),
    categoriaId: Yup.string('Ingrese la categoría').required(
      'Debe seleccionar una categoría'
    ),
    descripcion: Yup.string('Ingrese descripción del producto').required(
      'El producto debe tener una descripción'
    ),
    precio: Yup.number('Ingrese precio')
      .typeError('El precio debe estar en números')
      .required('Debe ingresar un precio')
      .min(0, 'El precio no puede ser menor a 0'),
    imagenes: Yup.mixed().required('Required!'),
  });

  const formik = useFormik({
    initialValues: {
      nombre: '',
      descripcion: '',
      marcaId: '',
      categoriaId: '',
      precio: '',
      imagenes: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      postCreateItem(values);

      // const formData = new FormData();
      // for (const key in values) {
      //   if (values.hasOwnProperty(key)) {
      //     if (key === 'imagenes') {
      //       for (let i = 0; i < values.imagenes.length; i++) {
      //         formData.append(`imagenes`, values.imagenes[i]);
      //       }
      //     } else {
      //       formData.append(key, values[key]);
      //     }
      //   }
      // }
      // console.log(formData);
      // try {
      //   const response = await fetch('http://localhost:3000/productos', {
      //     method: 'POST',
      //     body: formData,
      //   });
      //   if (response.ok) {
      //     console.log('Producto creado exitosamente');
      //   } else {
      //     console.error('Error al crear producto');
      //   }
      // } catch (error) {
      //   console.error('Error al crear producto:', error);
      // }
      // axios
      //   .post('http://localhost:3000/productos', { body: formData })
      //   .then((res) => console.log(res));
      // postCreateItem(values);
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
          id='nombre'
          name='nombre'
          label='Nombre Producto'
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.nombre && Boolean(formik.errors.nombre)}
          helperText={formik.touched.nombre && formik.errors.nombre}
        />
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

        <FormControl fullWidth>
          <InputLabel>Marca</InputLabel>
          <Select
            id='marcaId'
            name='marcaId'
            label='marcaId'
            value={formik.values.marcaId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.marcaId && Boolean(formik.errors.marcaId)}
          >
            <MenuItem value={1}>Casio</MenuItem>
            <MenuItem value={2}>Yamaha</MenuItem>
            <MenuItem value={3}>Fender</MenuItem>
            <MenuItem value={4}>Zildjian</MenuItem>
            <MenuItem value={5}>Jackson</MenuItem>
            <MenuItem value={6}>Gretsch</MenuItem>
            <MenuItem value={7}>Hohner</MenuItem>
            <MenuItem value={8}>DAddario</MenuItem>
            <MenuItem value={9}>Gibraltar</MenuItem>
            <MenuItem value={10}>Pearl</MenuItem>
          </Select>
          {!!formik.errors.marcaId && (
            <FormHelperText id='marcaId' sx={{ color: 'red' }}>
              {formik.touched.marcaId && formik.errors.marcaId}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Categoría</InputLabel>
          <Select
            id='categoriaId'
            name='categoriaId'
            label='categoriaId'
            value={formik.values.categoriaId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.categoriaId && Boolean(formik.errors.categoriaId)
            }
          >
            <MenuItem value={'1'}>Cuerdas</MenuItem>
            <MenuItem value={'2'}>Percusiones</MenuItem>
            <MenuItem value={'3'}>Teclas</MenuItem>
            <MenuItem value={'4'}>Vientos</MenuItem>
          </Select>
          {!!formik.errors.categoriaId && (
            <FormHelperText id='categoriaId' sx={{ color: 'red' }}>
              {formik.touched.categoriaId && formik.errors.categoriaId}
            </FormHelperText>
          )}
        </FormControl>

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
            id='imagenes'
            name='imagenes'
            accept='image/*'
            onBlur={formik.handleBlur}
            onChange={(e) => formik.setFieldValue('imagenes', e.target.files)}
          />
        </FormControl>
        {/* UPLOAD IMAGE */}
        <Button color='primary' variant='contained' fullWidth type='submit'>
          Crear Producto
        </Button>
      </Container>
    </form>
  );
};
