import { useContext, useState } from 'react';
import { ItemsContext } from '../context/ItemsContext';
import { Autocomplete, Box, TextField } from '@mui/material';

export const Ruben = () => {
  const { itemState, deleteProductbyId } = useContext(ItemsContext);
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleChange = (event, newValue) => {
    setSelectedValue(newValue);
  };
  const options = itemState.items;

  console.log(itemState.items);
  const filterOptions = (options, { inputValue }) => {
    return options.filter((option) => {
      const combinedText =
        `${option.nombre} ${option.nombreCategoria} ${option.nombreMarca}`.toLowerCase();
      return combinedText.includes(inputValue.toLowerCase());
    });
  };

  const getOptionLabel = (option) =>
    `${option.nombre} (${option.nombreCategoria}, ${option.nombreMarca})`;

  return (
    <>
      <h1>Buscador</h1>
      <Box sx={{ width: 300 }}>
        <Autocomplete
          value={selectedValue}
          onChange={handleChange}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          options={options}
          filterOptions={filterOptions}
          getOptionLabel={getOptionLabel}
          renderInput={(params) => (
            <TextField {...params} label='Buscar Producto' variant='outlined' />
          )}
        />
      </Box>
    </>
  );
};
