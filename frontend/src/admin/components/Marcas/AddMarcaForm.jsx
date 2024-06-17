import React, { useState } from 'react';
import { AdminLayout } from '../../layout/AdminLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Container, TextField } from '@mui/material';
import { useMarcas } from '../../../context/store/MarcasProvider';

export const AddMarcaForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createMarca } = useMarcas();
  const initialValues = {
    nombre: '',
  };

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required('El nombre de la marca es requerido')
      .min(2, 'El nombre debe tener al menos 2 caracteres'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        createMarca(values);
        resetForm();
      } catch (error) {
        console.log('Error: ' + error.message);
      } finally {
        setIsSubmitting(false);
      }
    },
  });
  return (
    <AdminLayout>
      <Container sx={{ width: '60%', paddingBottom: 5 }}>
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
              label='Nombre Marca'
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              helperText={formik.touched.nombre && formik.errors.nombre}
            />

            <Button color='primary' variant='contained' fullWidth type='submit'>
              {isSubmitting ? 'Creando...' : 'Crear Marca'}
            </Button>
          </Container>
        </form>
      </Container>
    </AdminLayout>
  );
};
