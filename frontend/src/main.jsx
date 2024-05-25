import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.jsx';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { ItemsProvider } from './context/ItemsProvider.jsx';
import { InstrumentCard } from './components/InstrumentCard.jsx';
import { Toaster } from 'sonner';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff5000', // orange
    },
    secondary: {
      main: '#121312', // dark lime green
    },
    terceario: {
      main: '#000000', // black
    },
    neutralColor: {
      main: '#ffffff', // white
    },
    buttonGreen: {
      main: '#50A020', // green
    },
    buttonRed: {
      main: '#CF2222', // red
    },
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ItemsProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ItemsProvider>
  </BrowserRouter>
);
