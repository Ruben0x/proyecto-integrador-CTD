import React from 'react';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

const FormikTextField = ({ formik, name, label, ...props }) => (
  <TextField
    id={name}
    name={name}
    label={label}
    value={formik.values[name]}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={formik.touched[name] && formik.errors[name]}
    {...props}
  />
);

const FormikSelect = ({ formik, name, label, options, ...props }) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select
      id={name}
      name={name}
      label={label}
      value={formik.values[name] || ''}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      {...props}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
    {!!formik.errors[name] && (
      <FormHelperText id={name} sx={{ color: 'red' }}>
        {formik.touched[name] && formik.errors[name]}
      </FormHelperText>
    )}
  </FormControl>
);

const FormikCurrencyField = ({ formik, name, label, ...props }) => (
  <FormControl>
    <InputLabel
      htmlFor={name}
      sx={{ ...(formik.errors[name] && { color: 'red' }) }}
    >
      {label}
    </InputLabel>
    <OutlinedInput
      id={name}
      name={name}
      label={label}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      startAdornment={<InputAdornment position='start'>$</InputAdornment>}
      {...props}
    />
    {!!formik.errors[name] && (
      <FormHelperText id={`${name}-error`} sx={{ color: 'red' }}>
        {formik.touched[name] && formik.errors[name]}
      </FormHelperText>
    )}
  </FormControl>
);

export { FormikTextField, FormikSelect, FormikCurrencyField };
