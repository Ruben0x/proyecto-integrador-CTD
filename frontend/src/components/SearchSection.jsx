import SearchBar from './SearchBar';
import Container from '@mui/material/Container';
import { Box, Button, Grid, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Calendario } from './Calendario';



const SearchSection = () => {
    return (
    <Container
    maxWidth='100%'
    className='section-buscar'
    sx={{
    backgroundImage: `url('/images/banner-portal-sonoro 1.png')`,
    backgroundSize: 'cover',
    minHeight: '300px',
    paddingBottom:'10px',
    backgroundPosition: useMediaQuery('(max-width:900px)')
        ? 'calc(0% - 490px + 10%)'
        : 'right',
    display: 'flex',
    justifyContent: 'center',
    }}
    >
    <Box maxWidth={'1440px'} width={'100%'}>
        <Grid container columnSpacing={1}>
            <Grid item>
            <Typography color={'#FFFFFF'} variant='body1' fontSize={32}>
                Bienvenido a
            </Typography>
            </Grid>
            <Grid item>
            <Typography
                variant='body1'
                sx={{
                fontWeight: '800',
                color: '#FF5500',
                display: 'inline',
                fontSize: 32,
                }}
            >
                PORTAL SONORO
            </Typography>
            </Grid>
        </Grid>
        <Typography color={'#FFFFFF'} fontSize={20}>
            Encuentra el equipamiento perfecto para ti
        </Typography>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
            <SearchBar maxWidth='733px' />
        </Grid>
        <Grid item xs={12} sm={5}>
            <Calendario/>
        </Grid>
        <Grid item xs={12} sm={2}>
        <Button type='submit' variant='contained' fullWidth color='primary'>
                    BUSCAR
                  </Button>
        </Grid>
        </Grid>
    </Box>
    </Container>
  );
};
export default SearchSection;