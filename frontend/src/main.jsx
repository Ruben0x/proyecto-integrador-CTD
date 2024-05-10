import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.jsx';
import { ThemeProvider, createTheme } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5000"
    },
      secondary: {
      main: "#121312"
    },
    terceario: {
      main: "#000000"
    },
    neutralColor: {
      main: "#ffffff"
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </BrowserRouter>
);
