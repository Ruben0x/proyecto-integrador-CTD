//import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import SearchBar from './SearchBar';
import Container from '@mui/material/Container';
import { Box, Grid, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import MediaCard from './MediaCard';
import { GridInstrumentos } from './GridInstrumentos';
import SearchSection from './SearchSection';
import useCategorias from '../helpers/useCategorias';






const ResponsiveBody = () => {
  const arrayCategorias = useCategorias();
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
