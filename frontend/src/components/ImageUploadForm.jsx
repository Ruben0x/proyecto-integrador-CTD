import React from 'react';

import { Formik, Form, Field } from 'formik';
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@mui/material';

const ImageUploadForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ image: null }}
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        if (!values.image) {
          errors.image = 'Debes seleccionar una imagen';
        }
        return errors;
      }}
    >
      {({ setFieldValue, errors, touched }) => (
        <Form>
          <FormControl fullWidth error={errors.image && touched.image}>
            <InputLabel htmlFor='image'>Imagen</InputLabel>

            <Field name='image'>
              {({ field, form }) => (
                <Input
                  id='image'
                  type='file'
                  inputProps={{ accept: 'image/*' }}
                  onChange={(event) => {
                    form.setFieldValue(
                      field.name,
                      event.currentTarget.files[0]
                    );
                  }}
                  error={errors.image && touched.image}
                />
              )}
            </Field>
            {errors.image && touched.image && (
              <FormHelperText>{errors.image}</FormHelperText>
            )}
          </FormControl>
          <Button type='submit' variant='contained' color='primary'>
            Subir
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ImageUploadForm;
