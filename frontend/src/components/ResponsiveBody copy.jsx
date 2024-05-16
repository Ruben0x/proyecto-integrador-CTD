//import { Link } from 'react-router-dom';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import SearchBar from './SearchBar';
import Container from '@mui/material/Container';
import { useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import MediaCard from './Card';
import { useItemsStates } from '../../context/ItemsProvider';
import { useEffect, useState } from 'react';
import { ItemsContext } from '../../context/ItemsContext';

//===HARDCODEO DE CATEGORIAS
const arrayhardcode = [
  { imagen: '/images/cuerdas-categorias.png', categoria: 'cuerdas' },
  { imagen: '/images/percusiones-categorias.png', categoria: 'percusiones' },
  { imagen: '/images/teclas-categorias.png', categoria: 'teclas' },
  { imagen: '/images/vientos-categoria.png', categoria: 'vientos' },
];

const ResponsiveBody = () => {


  return (
    <div>
      <Stack
        spacing={2}
        sx={{
          backgroundColor: '#F9E9DE',
          width: '100vw',
        }}
      >
{/*Seccion Buscador del Body*/}
        <Container
          maxWidth='false'
          className='section-buscar'
          sx={{
            backgroundImage: `url('/images/banner-portal-sonoro 1.png')`,
            backgroundSize: 'cover',
            width: '100vw',
            height: '300px',
            backgroundPosition: useMediaQuery('(max-width:900px)')
              ? 'calc(0% - 490px + 10%)'
              : 'right',
          }}
        >
          <Typography color={'#FFFFFF'} variant='body1'  fontSize={32}>
            Bienvenido a
            <Typography
              variant='body1'
              sx={{
                fontWeight: '800',
                color: '#FF5500',
                display: 'inline',
                fontSize: 32,
              }}
              
            >
              {' '}
              PORTAL SONORO!
            </Typography>
          </Typography>

          <Typography color={'#FFFFFF'} fontSize={20}>
            Encuentra el equipamiento perfecto para ti
          </Typography>
          <SearchBar maxWidth='733px' />
        </Container>

{/*Seccion categorias del Body*/}
        <Container
          maxWidth='false'
          className='section-categorias'
          sx={{
            width: '100vw',
          }}
        >
          <Typography fontWeight='bold' fontSize={12}>
            Revisa las categorías - Reserva tus opciones
          </Typography>
          <Typography fontSize={20}>
            ENCUENTRA TU{' '}
            <Typography
              fontWeight='800'
              fontSize={20}
              color={'#FF5500'}
              display={'inline'}
            >
              EQUIPAMIENTO
            </Typography>
          </Typography>

          {/*/contenedor de tarjeta: **esta hardcodeado***/}
          <Container
            sx={{
             
              minWidth:'100%',
              display: 'flex',
              justifyContent: useMediaQuery('(max-width:736px)')
                ? 'center'
                : 'space-between',
              alignItems : 'center',
              flexWrap: 'wrap',
             }}
          >
            {arrayhardcode.map((item, index) => (
              <MediaCard
                imagen={item.imagen}
                categoria={item.categoria}
                key={index}
              />
            ))}
          </Container>
        </Container>

{/*Seccion recomendados del Body*/}
        <Container
          maxWidth='false'
          className='section-recomendados'
          sx={{
            width: '100vw',
            height: '300px',
          }}
        >
          <Typography fontWeight='800' fontSize={20}>
            <Typography
              fontWeight='800'
              fontSize={20}
              color={'#FF5500'}
              display={'inline'}
            >
              100%{' '}
            </Typography>
            RECOMENDADOS
          </Typography>
          <Typography fontWeight='600' fontSize={12}>
            Creemos que estas alternativas son perfectas para ti
          </Typography>
{/*======================*/}          
          
          
          [CARDS]



{/*======================*/}                    
        </Container>
      </Stack>
    </div>
  );
};
export default ResponsiveBody;