//import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import {  Grid,  } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridInstrumentos } from './GridInstrumentos';
import SearchSection from './SearchSection';
import CategoriasSectionMain from './CategoriasSectionMain';

const ResponsiveBody = () => {

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Stack
        spacing={0}
        sx={{
          width: '100%',
        }}
      >
        {/*Seccion Buscador del Body*/}
        <SearchSection/>

        {/*Seccion categorias del Body*/}
        <CategoriasSectionMain/>

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
          <Grid container justifyContent={'center'} columnSpacing={1}>
            <Grid item>
              <Typography
                fontWeight='800'
                color={'#FF5500'}
                display={'inline'}
                sx={{ fontSize: { xs: 30, md: 40 } }}
              >
                100%{' '}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                fontWeight='800'
                sx={{ fontSize: { xs: 30, md: 40 } }}
              >
                RECOMENDADOS
              </Typography>
            </Grid>
          </Grid>
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
