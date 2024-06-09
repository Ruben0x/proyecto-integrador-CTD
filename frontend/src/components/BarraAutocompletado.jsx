import { useContext, useState } from 'react';
import { ItemsContext } from '../context/ItemsContext';
import { Autocomplete, Box, TextField } from '@mui/material';

export const BarraAutocompletado = () => {
  const { itemState } = useContext(ItemsContext);
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
        `${option.nombre} ${option.nombreCategoria} ${option.nombreMarca} ${option.descripcion}`.toLowerCase();
      return combinedText.includes(inputValue.toLowerCase());
    });
  };

  const getOptionLabel = (option) =>
    `${option.nombre} (${option.nombreCategoria}, ${option.nombreMarca}), ${option.descripcion}`;

  return (

    <Box sx={{width:'100%', backgroundColor:'white', padding: '0', height:'48px'}}>
        <Autocomplete
          value={selectedValue}
          onChange={handleChange}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          options={options}
          filterOptions={filterOptions}
          getOptionLabel={getOptionLabel}
          renderInput={(params) => (
            <TextField {...params}  variant='outlined' />
          )}
        />
      </Box>

  );
};