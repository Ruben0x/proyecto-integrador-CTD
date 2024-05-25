import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ItemsContext } from '../../context/ItemsContext';
import { SimpleDialog } from './SelectorCategorias';
import { arrayCategorias } from '../../components/ResponsiveBody';
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

export const AddProductForm = ({ item = '' }) => {
  //Para emergente de categorías===========
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(arrayCategorias[0].nombre);
  const [selectedId, setSelectedId] = useState(arrayCategorias[0].id);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value, id) => {
    setOpen(false);
    setSelectedValue(value);
    setSelectedId(id);
  };
  //=================================

  const { postCreateItem } = useContext(ItemsContext);
  // console.log(item);

  const validationSchema = Yup.object({
    nombre: Yup.string('Ingrese el Nombre del producto')
      .min(2, 'Mínimo 2 caracteres')
      .max(30, 'Máximo 30 caracteres')
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
      nombre: item.nombre || '',
      descripcion: item.descripcion || '',
      marcaId: item.marcaId || '',
      categoriaId: item.categoriaId || '',
      precio: item.precio || '',
      imagenes: item.urlImg || [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // postCreateItem(values);
    },
  });
  return (
    <Container sx={{ width: '60%' }}>
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

            {/**Despliega ventana de categorias*/}

            {/* <SimpleDialog
            selectedValue={selectedValue}
            selectedId={selectedId}
            open={open}
            onClose={handleClose}
          />
          <TextField
            fullWidth
            label='Categoría'
            onClick={handleClickOpen}
            value={selectedValue.toUpperCase()}
            id='nombreCategoria'
            name='nombreCategoria'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.nombreCategoria &&
              Boolean(formik.errors.nombreCategoria)
            }
            helperText={
              formik.touched.nombreCategoria && formik.errors.nombreCategoria
            }
          />
          {!!formik.errors.nombreCategoria && (
            <FormHelperText id='nombreCategoria' sx={{ color: 'red' }}>
              {formik.touched.nombreCategoria && formik.errors.nombreCategoria}
            </FormHelperText>
          )}
          <input
            type='hidden'
            value={selectedId}
            id='categoriaId'
            name='categoriaId'
            readOnly
          /> */}
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
              startAdornment={
                <InputAdornment position='start'>$</InputAdornment>
              }
            />
            {!!formik.errors.precio && (
              <FormHelperText id='precio-error' sx={{ color: 'red' }}>
                {formik.touched.precio && formik.errors.precio}
              </FormHelperText>
            )}
          </FormControl>

          {/* UPLOAD IMAGE */}
          {!item ? (
            <>
              <FormControl>
                <input
                  type='file'
                  multiple
                  id='imagenes'
                  name='imagenes'
                  accept='image/*'
                  onBlur={formik.handleBlur}
                  onChange={(e) =>
                    formik.setFieldValue('imagenes', e.target.files)
                  }
                />
              </FormControl>
              <Button
                color='primary'
                variant='contained'
                fullWidth
                type='submit'
              >
                Crear Producto
              </Button>
            </>
          ) : (
            <Button color='primary' variant='contained' fullWidth type='submit'>
              Editar
            </Button>
          )}
          {/* UPLOAD IMAGE */}
        </Container>
      </form>
    </Container>
  );
};
