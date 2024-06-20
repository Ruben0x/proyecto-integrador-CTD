import React, { useContext, useEffect } from 'react';
import {
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Checkbox,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../auth/layout/AuthLayout'; 
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { GlobalUserDataContext } from '../auth/helpers/globalUserData';
import { ItemsContext } from '../context/ItemsContext';
import { InstrumentCardResponsiveXS } from './InstrumentCardResponsiveXS';

const productoHardCode = {
    "id": 1,
    "nombre": "Akai MPK Mini",
    "descripcion": "Controlador MIDI compacto y versátil",
    "categoriaId": 3,
    "nombreCategoria": "Teclas",
    "marcaId": 11,
    "nombreMarca": "Akai",
    "precio": 15000,
    "esFavorito": false,
    "imagenes": [
        {
            "id": 1,
            "url": "http://localhost:3000/images/Akai.jpg"
        },
        {
            "id": 2,
            "url": "http://localhost:3000/images/akai2.jpg"
        },
        {
            "id": 3,
            "url": "http://localhost:3000/images/aka3.jpg"
        },
        {
            "id": 4,
            "url": "http://localhost:3000/images/aka4.jpg"
        },
        {
            "id": 5,
            "url": "http://localhost:3000/images/aka5.jpg"
        },
        {
            "id": 6,
            "url": "http://localhost:3000/images/aka6.jpg"
        }
    ],
    "caracteristicas": [
        {
            "caracteristicaId": 1,
            "caracteristicaTipoCaracteristicaId": 4,
            "nombre": "TIPO DE INSTRUMENTO",
            "icono": "i-acero",
            "descripcion": "Tipo instrumento musical",
            "valor": "Electrónico"
        },
        {
            "caracteristicaId": 2,
            "caracteristicaTipoCaracteristicaId": 9,
            "nombre": "COLOR",
            "icono": "i-madera-roble",
            "descripcion": "Color del instrumento musical",
            "valor": "Negro"
        },
        {
            "caracteristicaId": 3,
            "caracteristicaTipoCaracteristicaId": 21,
            "nombre": "PESO (KG)",
            "icono": "i-aluminio",
            "descripcion": "Peso del instrumento musical en kilogramos",
            "valor": "0.75"
        },
        {
            "caracteristicaId": 4,
            "caracteristicaTipoCaracteristicaId": 89,
            "nombre": "DIMENSIONES (CM)",
            "icono": "i-aluminio",
            "descripcion": "Dimensiones físicas del instrumento en centímetros",
            "valor": "31 x 18 x 4"
        },
        {
            "caracteristicaId": 5,
            "caracteristicaTipoCaracteristicaId": 110,
            "nombre": "MATERIAL",
            "icono": "i-aluminio",
            "descripcion": "Materiales de los que está hecho el instrumento musical",
            "valor": "Plástico"
        },
        {
            "caracteristicaId": 6,
            "caracteristicaTipoCaracteristicaId": 114,
            "nombre": "CONTROLES",
            "icono": "i-aluminio",
            "descripcion": "Controles y ajustes disponibles en el instrumento musical",
            "valor": "Ruedas de modulación y pitch"
        },
        {
            "caracteristicaId": 7,
            "caracteristicaTipoCaracteristicaId": 132,
            "nombre": "INCLUYE",
            "icono": "i-aluminio",
            "descripcion": "Accesorios o componentes adicionales que vienen con el instrumento musical",
            "valor": "Cable USB, software de producción"
        },
        {
            "caracteristicaId": 8,
            "caracteristicaTipoCaracteristicaId": 138,
            "nombre": "CONDICION",
            "icono": "i-aluminio",
            "descripcion": "Estado físico y funcional del instrumento musical",
            "valor": "Nuevo"
        }
    ]
};


export const Booking = (producto, fechaInicio, fechaFin, checkAcepta) => {
    const { isLogged, globalUserData } = useContext(GlobalUserDataContext);

    useEffect(() => {
        //este codigo redirige a 'login' cuando intenta ir a /booking sin loggear
        if (!isLogged) {
          window.location.replace('/auth/login');
        }
        /*if (!checkAcepta) {
        // Si llegó a esta pag sin tickear terminos y condiciones, regresa en el nav 
            history.goBack(); 
          }*/
         console.log(productoHardCode);
        }, [isLogged, 
            //checkAcepta
            ]);
  return (
    <AuthLayout title='CONFIRMA' subtitle=' TU RESERVA'>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
         
      >
        <Grid item sx={{ width: '100%' }}> 
            <InstrumentCardResponsiveXS instrument={productoHardCode}/>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
