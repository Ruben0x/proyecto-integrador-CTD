//import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import SearchBar from './SearchBar';
import Container from '@mui/material/Container';
import { useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';

const ResponsiveBody = () => {
  //const {state, dispatch} = useGlobalStates();

  return (
    <div>
      <Stack
        spacing={2}
        sx={{
          height: '100vh',
          backgroundColor: '#F9E9DE',
          width: '100vw',
        }}
      >
        <Container
          maxWidth='false'
          className='section-buscar'
          sx={{
            backgroundImage: `url('public/images/banner-portal-sonoro 1.png')`,
            backgroundSize: 'fill',
            width: '100vw',
            height: '300px',
            backgroundPosition: useMediaQuery('(max-width:900px)')
              ? 'calc(0% - 490px + 10%)'
              : 'right',
          }}
        >
            <Typography
            color={'#FFFFFF'}
            variant="body1"
            inline
            fontSize={32}
            >
                Bienvenido a 
                <Typography
                variant="body1"
                sx={{
                fontWeight: '800',
                color: '#FF5500',
                display: 'inline',
                fontSize:32,
                }}
                inline
                >
                    {' '}PORTAL SONORO!
                </Typography> 
            </Typography>

            <Typography 
            color={'#FFFFFF'}
            fontSize={20}>
            Encuentra el equipamiento perfecto para ti
            </Typography>
            <SearchBar maxWidth='733px' />
        </Container>

        <Container
          maxWidth='false'
          className='section-categorias'
          sx={{
            width: '100vw',
            height: '300px',
          }}
        >
            <Typography 
            fontWeight='bold'
            fontSize={12}>
                Revisa las categorías - Reserva tus opciones
            </Typography>   
            <Typography 
            
            fontSize={20}>
                ENCUENTRA TU {' '}
                <Typography
                 fontWeight='800'
                 fontSize={20}
                 color={'#FF5500'}
                 display={'inline'}>
                    EQUIPAMIENTO
                </Typography>     
            </Typography>   
        [CARDS]
        </Container>

        <Container
          maxWidth='false'
          className='section-recomendados'
          sx={{
            width: '100vw',
            height: '300px',
          }}>
            <Typography 
            fontWeight='800'
            fontSize={20}>
                <Typography
                 fontWeight='800'
                 fontSize={20}
                 color={'#FF5500'}
                 display={'inline'}>
                    100% {' '}
                </Typography>
                RECOMENDADOS     
            </Typography> 
            <Typography 
            fontWeight='600'
            fontSize={12}>
                Creemos que estas alternativas son perfectas para ti
            </Typography>
            [CARDS]
        </Container>
      </Stack>
    </div>
  );
};
export default ResponsiveBody;
