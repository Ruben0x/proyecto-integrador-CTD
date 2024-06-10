//import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import {  Grid, Link,  } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridInstrumentosResult } from './GridInstrumentosResult';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CategoriasSectionXS from './CategoriasSectionXS';


const ItemsByCategory = () => {

  const { id } = useParams();
  const [productos, setProductos] = useState([]);


  useEffect(() => {
    axios('http://localhost:3000/categorias/' + id+'/productos')
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
      
  }, [id]);

  if (!productos) {
    return <Navigate to={'/'} />;
  } 
  const tituloCategoria = productos[0]?.nombreCategoria.toUpperCase();  



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
        <CategoriasSectionXS/>

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
            <Grid item>
            </Grid>
          </Grid>


          <GridInstrumentosResult productos={productos} />
        </Container>
      </Stack>
    </div>
  );
};
export default ItemsByCategory;
