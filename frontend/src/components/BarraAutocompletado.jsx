import { useContext, useEffect, useState } from 'react';
import { ItemsContext } from '../context/ItemsContext';
import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';

import BaseHardcoded from '../../src/helpers/baseProductosHardcode.json';
import { userProductos } from '../context/store/ProductosProvider';
import { useUsers } from '../context/store/UsersProvider';

export const BarraAutocompletado = ({ formik }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  const loggedToken = sessionStorage.getItem('token');
  const { getAllProducts, isLoading, productoState } = userProductos();
  const { userState } = useUsers();

  useEffect(() => {
    loggedToken
      ? getAllProducts(loggedToken)
      : getAllProducts(userState.token.accessToken);
  }, []);

  const productos = productoState.todosProductos;

  if (isLoading) return <CircularProgress />;

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    formik.setFieldValue('searchField', newInputValue);
  };

  const handleChange = (event, newValue) => {
    if (newValue) {
      setSelectedValue(newValue);
      formik.setFieldValue('searchField', newValue.nombre);
    } else {
      setSelectedValue(null);
      formik.setFieldValue('searchField', '');
    }
  };

  const filterOptions = (options, { inputValue }) => {
    if (!inputValue) return [];
    return options.filter((option) => {
      const combinedText =
        `${option.nombre} ${option.nombreCategoria} ${option.nombreMarca} ${option.descripcion}`.toLowerCase();
      return combinedText.includes(inputValue.toLowerCase());
    });
  };

  const getOptionLabel = (option) =>
    `${option.nombre} (${option.nombreCategoria}, ${option.nombreMarca}), ${option.descripcion}`;

  const renderOption = (props, option) => (
    <li {...props}>
      <Box component='span' sx={{ fontWeight: 'bold' }}>
        {option.nombre}
      </Box>
      &nbsp;({option.nombreCategoria}, {option.nombreMarca}),{' '}
      {option.descripcion}
    </li>
  );

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '4px',
        padding: '0',
        height: '56px',
      }}
    >
      <Autocomplete
        freeSolo
        autoHighlight
        value={selectedValue}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={inputValue ? productos : []}
        filterOptions={filterOptions}
        getOptionLabel={getOptionLabel}
        renderOption={renderOption}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            placeholder='BUSCA ACÁ TU INSTRUMENTO'
          />
        )}
      />
    </Box>
  );
};
