//import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { Grid, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridInstrumentosResult } from './GridInstrumentosResult';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CategoriasSectionXS from './CategoriasSectionXS';
import { useUsers } from '../context/store/UsersProvider';

const ItemsByCategory = () => {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const { userState } = useUsers();

  const accessToken = userState.token.accessToken;
  const loggedToken = sessionStorage.getItem('token');
  const token = loggedToken || accessToken;

  const [arrayFilter, setArrayFilter] = useState([id]); // el arrayfilter se llena desde el CategoriasSectionXS

  //primer fetch: al llegar a la pagina de items por catgoria
  useEffect(() => {
    axios(`${import.meta.env.VITE_API_URL}/categorias/${id}/productos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const transformedData = res.data.map((producto) => {
          return {
            ...producto,
            imagenes: producto.imagenes.map((imagen) => imagen.url),
          };
        });
        setProductos(transformedData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  //resto de los fetch: al interactuar con las cardsXS
  const handleFilterChange = (newArray) => {
    setArrayFilter(newArray);

    if (newArray.length === 1) {
      axios(
        `${import.meta.env.VITE_API_URL}/categorias/${newArray[0]}/productos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          const transformedData = res.data.map((producto) => {
            return {
              ...producto,
              imagenes: producto.imagenes.map((imagen) => imagen.url),
            };
          });
          setProductos(transformedData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios(
        `${import.meta.env.VITE_API_URL}/categorias/${newArray[0]}/productos?filter=${newArray.slice(1).join(',')}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          const transformedData = res.data.map((producto) => {
            return {
              ...producto,
              imagenes: producto.imagenes.map((imagen) => imagen.url),
            };
          });
          setProductos(transformedData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (!productos) {
    return <Navigate to={'/'} />;
  }
  const tituloCategoria = [
    ...new Set(
      productos.map((producto) => producto.nombreCategoria.toUpperCase())
    ),
  ].join(', ');

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
        {/*Seccion categorias del Body*/}
        <CategoriasSectionXS id={id} onFilterChange={handleFilterChange} />

        {/*Seccion recomendados del Body*/}
        <Container
          className='section-categorias-result'
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
                {tituloCategoria}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                fontWeight='800'
                sx={{ fontSize: { xs: 30, md: 40 } }}
              >
                EN TODAS SUS VARIEDADES
              </Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>

          <GridInstrumentosResult productos={productos} />
        </Container>
      </Stack>
    </div>
  );
};
export default ItemsByCategory;
