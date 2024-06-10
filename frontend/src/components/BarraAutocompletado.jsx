import { useContext, useState } from "react";
import { ItemsContext } from "../context/ItemsContext";
import { Autocomplete, Box, TextField } from "@mui/material";

import BaseHardcoded from "../../src/helpers/baseProductosHardcode.json";

export const BarraAutocompletado = ({ formik }) => {
  const { itemState } = useContext(ItemsContext);
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    formik.setFieldValue("searchField", newInputValue);
  };

  const handleChange = (event, newValue) => {
    if (newValue) {
      setSelectedValue(newValue);
      formik.setFieldValue("searchField", newValue.nombre);
    } else {
      setSelectedValue(null);
      formik.setFieldValue("searchField", "");
    }
  };
  const options = itemState.items.length > 0 ? itemState.items : BaseHardcoded;

  // console.log(itemState.items);
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
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "4px",
        padding: "0",
        height: "56px",
      }}
    >
      <Autocomplete
        freeSolo
        value={selectedValue}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={options}
        filterOptions={filterOptions}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="BUSCA ACÁ TU INSTRUMENTO"
          />
        )}
      />
    </Box>
  );
};
