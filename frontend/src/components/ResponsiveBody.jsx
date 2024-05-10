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
          <Typography color={'whitesmoke'}>
            Bienvenido a PORTAL SONORO!{' '}
          </Typography>
          <Typography color={'whitesmoke'}>
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
          <Typography>Categorías </Typography>
        </Container>

        <Container
          maxWidth='false'
          className='section-recomendados'
          sx={{
            width: '100vw',
            height: '300px',
          }}
        >
          <Typography>Recomendados</Typography>
        </Container>
      </Stack>
    </div>
    //<section class= "secCategorias">Categorías</section>
    //<section class = "secRecomendados">Recomendados</section>
  );
};
export default ResponsiveBody;
