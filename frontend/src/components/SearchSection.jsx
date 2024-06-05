import SearchBar from './SearchBar';
import Container from '@mui/material/Container';
import { Box, Grid, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';



const SearchSection = () => {
    return (
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
    <SearchBar maxWidth='733px' />
    </Box>
    </Container>
  );
};
export default SearchSection;