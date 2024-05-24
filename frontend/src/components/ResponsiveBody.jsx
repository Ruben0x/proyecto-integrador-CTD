//import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import SearchBar from './SearchBar';
import Container from '@mui/material/Container';
import { Box, Card, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import MediaCard from './MediaCard';
import { ItemsContext } from '../context/ItemsContext';
import { useState, useEffect, useContext } from 'react';
import { GridInstrumentos } from './GridInstrumentos';


//===HARDCODEO DE CATEGORIAS
export  const arrayCategorias = [
  {  id:1, nombre: 'cuerdas', img: '/images/cuerdas-categorias.png' },
  {  id:2, nombre: 'percusiones', img: '/images/percusiones-categorias.png' },
  {  id:3, nombre: 'teclas', img: '/images/teclas-categorias.png' },
  {  id:4, nombre: 'vientos', img: '/images/vientos-categoria.png' },
];

const ResponsiveBody = () => {
  const { itemState } = useContext(ItemsContext);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(itemState.items);
  }, [itemState]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      
      }}>
      <Stack
        spacing={0}
        sx={{
        width:'100%',
        }}
      >
        {/*Seccion Buscador del Body*/}
        <Container 
          maxWidth='100%'
          className='section-buscar'

          sx={{
            backgroundImage: `url('/images/banner-portal-sonoro 1.png')`,
            backgroundSize: 'cover',
            height: '300px',
            backgroundPosition: useMediaQuery('(max-width:900px)')
              ? 'calc(0% - 490px + 10%)'
              : 'right',
              display: 'flex', 
              justifyContent:'center'
          }}
        >
          <Box maxWidth={'1440px'} width={'100%'}>
            <Typography color={'#FFFFFF'} variant='body1' fontSize={32}>
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
                {' '}PORTAL SONORO
              </Typography>
            </Typography>

            <Typography color={'#FFFFFF'} fontSize={20}>
              Encuentra el equipamiento perfecto para ti
            </Typography>
            <SearchBar maxWidth='733px' />
          </Box>
          </Container>

        {/*Seccion categorias del Body*/}
        <Container
          maxWidth='false'
          className='section-categorias'
          sx={{
            backgroundColor: '#F9E9DE',
            paddingTop: '50px',
            paddingBottom: '100px',
            display:'flex',
            justifyContent:'center'
          }}
        >
        <Box maxWidth={'1440px'} width={'100%'}>
          <Typography fontWeight='bold' fontSize={20}>
            Revisa las categorías - Reserva tus opciones
          </Typography>
          <Typography fontSize={40}>
            ENCUENTRA TU{' '}
            <Typography
              fontWeight='800'
              fontSize={40}
              color={'#FF5500'}
              display={'inline'}
            >
              EQUIPAMIENTO
            </Typography>
          </Typography>

          {/*/contenedor de tarjeta: **esta hardcodeado***/}
          <Container
            sx={{
              minWidth: '100%',
              display: 'flex',
              justifyContent: 'space-around',

              flexWrap: 'wrap',
            }}
          >
            {arrayCategorias.map((item) => (
              <MediaCard
                imagen={item.img}
                categoria={item.nombre}
                key={item.id}
              />
            ))}
          </Container>
          </Box>
        </Container>

        {/*Seccion recomendados del Body*/}
        <Container
          className='section-recomendados'
          sx={{
            width: '100%',
            minHeight: '300px',
            height: '100%',
            textAlign: 'center',
            padding: '30px',

          }}
        >
          <Typography fontWeight='800' fontSize={35}>
            <Typography
              fontWeight='800'
              fontSize={40}
              color={'#FF5500'}
              display={'inline'}
            >
              100%{' '}
            </Typography>
            RECOMENDADOS
          </Typography>
          <Typography fontWeight='600' fontSize={20}>
            Creemos que estas alternativas son perfectas para ti
          </Typography>

          <GridInstrumentos />
        </Container>
      </Stack>
    </div>
  );
};
export default ResponsiveBody;
