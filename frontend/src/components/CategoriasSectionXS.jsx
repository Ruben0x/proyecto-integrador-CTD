import Container from '@mui/material/Container';
import { Box, Grid,  } from '@mui/material';
import Typography from '@mui/material/Typography';
import MediaCard from './MediaCard';
import useCategorias from '../helpers/useCategorias';
import { Link as RouterLink } from 'react-router-dom';


const CategoriasSectionXS = () => {
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
                <MediaCard
                  imagen={item.img}
                  categoria={item.nombre}
                  key={item.id}
                />
              ))}
            </Container>
          </Box>
        </Container>


    );
};
export default CategoriasSectionXS;