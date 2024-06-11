import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Button,
  Container,
  FormControl,
  TextField,
  styled,
} from '@mui/material';
import { AdminLayout } from '../../layout/AdminLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createCategory } from '../../../context/store/CategoriasProvider';
import { useState } from 'react';
export const AddCategoryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    nombre: '',
    descripcion: '',
    imagen: null,
  };

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required('El nombre de la categoría es requerido')
      .min(2, 'El nombre debe tener al menos 2 caracteres'),
    descripcion: Yup.string()
      .required('La descripción es requerida')
      .min(10, 'La descripción debe tener al menos 10 caracteres'),
    imagen: Yup.mixed()
      .required('Se requiere una imagen')
      .test(
        'fileSize',
        'El archivo es demasiado grande',
        (value) => value && value.size <= 2000000 // 2MB
      )
      .test(
        'fileFormat',
        'Formato no soportado',
        (value) =>
          value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)
      ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        await createCategory(values);
        resetForm();
      } catch (error) {
        console.log(error);
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
              label='Nombre Categoría'
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
              helperText={
                formik.touched.descripcion && formik.errors.descripcion
              }
            />
            <FormControl>
              <Button
                component='label'
                variant='contained'
                startIcon={<CloudUploadIcon />}
              >
                Subir Imagen
                <input
                  type='file'
                  id='imagen'
                  name='imagen'
                  accept='image/*'
                  hidden
                  onBlur={formik.handleBlur}
                  onChange={(e) =>
                    formik.setFieldValue('imagen', e.currentTarget.files[0])
                  }
                />
              </Button>
              {formik.touched.imagen && formik.errors.imagen ? (
                <div style={{ color: 'red' }}>{formik.errors.imagen}</div>
              ) : null}
            </FormControl>
            <Button color='primary' variant='contained' fullWidth type='submit'>
              {isSubmitting ? 'Creando...' : 'Crear Categoría'}
            </Button>
          </Container>
        </form>
      </Container>
    </AdminLayout>
  );
};
