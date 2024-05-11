import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({maxWidth}) {
  return (
    <Paper
      component="form"
      sx={{ 
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: maxWidth,
        }}
    >

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Busca acá tu Instrumento"
        inputProps={{ 'Poppins': 'Busca acá tu Instrumento' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} Poppins="search">
        <SearchIcon />
      </IconButton>

    </Paper>
  );
}
