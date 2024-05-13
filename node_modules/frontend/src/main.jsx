import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.jsx';
<<<<<<< HEAD
import { ThemeProvider, createTheme } from "@mui/material/styles";
=======
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
>>>>>>> 892336f64ac339b39b90636959f45b6a47e97d18

const theme = createTheme({
  palette: {
    primary: {
<<<<<<< HEAD
      main: "#ff5000" // orange
    },
      secondary: {
      main: "#121312" // dark lime green
    },
    terceario: {
      main: "#000000" // black
    },
    neutralColor: {
      main: "#ffffff" // white
    }
  }
=======
      main: '#ff5000',
    },
    secondary: {
      main: '#121312',
    },
    terceario: {
      main: '#000000',
    },
    neutralColor: {
      main: '#ffffff',
    },
  },
>>>>>>> 892336f64ac339b39b90636959f45b6a47e97d18
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
