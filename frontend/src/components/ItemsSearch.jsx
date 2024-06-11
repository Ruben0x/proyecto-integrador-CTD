import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { Grid, Typography } from '@mui/material';
import { GridInstrumentosResult } from './GridInstrumentosResult';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SearchSection from './SearchSection';
import { userProductos } from '../context/store/ProductosProvider';

const ItemsSearch = () => {
  const location = useLocation();
  const query = location.state.query;

  // const [productos, setProductos] = useState([]);

  const loggedToken = sessionStorage.getItem('token');
  const { getAllProducts, isLoading, productoState } = userProductos();
  useEffect(() => {
    getAllProducts(loggedToken);
  }, []);

  const productos = productoState.todosProductos;

  // if (isLoading) return 'Cargando ...';

  const handleFormSubmit = (values) => {
    console.log('data recibida');
    // console.log(values);
    // Aquí puedes realizar alguna acción con los valores del formulario si es necesario
  };

  const filterProductos = () => {
    if (query.searchField) {
      const keyWord = query.searchField.toLowerCase();
      return productos.filter((producto) => {
        return (
          producto.nombre.toLowerCase().includes(keyWord) ||
          producto.descripcion.toLowerCase().includes(keyWord) ||
          producto.nombreCategoria.toLowerCase().includes(keyWord) ||
          producto.nombreMarca.toLowerCase().includes(keyWord)
        );
      });
    } else {
      return productos;
    }
  };

  const filteredProductos = filterProductos();

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
        {/* Sección buscador */}
        <SearchSection onSubmit={handleFormSubmit} />

        {/* Sección de resultados */}
        <Container
          className='section-categorias-result'
          sx={{
            width: '100%',
            minHeight: '300px',
            height: '100%',
            textAlign: 'center',
            padding: '30px',
            marginTop: '50px',
            marginBottom: '50px',
          }}
        >
          <Grid container justifyContent='center' columnSpacing={1}>
            <Grid item>
              <Typography
                fontWeight='800'
                sx={{
                  fontSize: { xs: 30, md: 40 },
                  '& span': {
                    color: '#ff5500',
                  },
                }}
              >
                {`Resultados para `}
                <span>{query.searchField}</span>
              </Typography>
            </Grid>
          </Grid>

          <GridInstrumentosResult productos={filteredProductos} />
        </Container>
      </Stack>
    </div>
  );
};

export default ItemsSearch;
