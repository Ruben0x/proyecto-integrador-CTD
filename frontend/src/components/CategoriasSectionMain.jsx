import Container from '@mui/material/Container';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import MediaCard from './MediaCard';
import { useCategorias } from '../helpers/useCategorias';
import { Link } from 'react-router-dom';

const CategoriasSectionMain = () => {
  const arrayCategorias = useCategorias();
  return (
    <Container
      maxWidth='false'
      className='section-categorias'
      sx={{
        backgroundColor: '#F9E9DE',
        paddingTop: '50px',
        paddingBottom: '100px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box maxWidth={'1440px'} width={'100%'}>
        <Grid container justifyContent={'center'}>
          <Typography fontWeight='bold' fontSize={20}>
            Revisa las categorías - Reserva tus opciones
          </Typography>
          <Grid
            container
            columnSpacing={1}
            justifyContent={'center'}
            alignItems={'baseline'}
          >
            <Grid item>
              <Typography fontSize={40}>ENCUENTRA TU </Typography>
            </Grid>
            <Grid item>
              <Typography
                fontWeight='800'
                fontSize={40}
                color={'#FF5500'}
                display={'inline'}
              >
                EQUIPAMIENTO
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Container
          sx={{
            minWidth: '100%',
            display: 'flex',
            justifyContent: 'space-around',

            flexWrap: 'wrap',
          }}
        >
          {arrayCategorias.map((item) => (
            <Link key={item.id} to={`/instrumentos/cat/${item.id}`}>
              <MediaCard imagen={`http://localhost:3000/images/${item.img}`} categoria={item.nombre} />
            </Link>
          ))}
        </Container>
      </Box>
    </Container>
  );
};
export default CategoriasSectionMain;
