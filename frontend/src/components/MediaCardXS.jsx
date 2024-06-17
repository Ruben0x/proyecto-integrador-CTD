import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Box, Button, sliderClasses,  } from '@mui/material';
import { useEffect, useState } from 'react';

export default function MediaCardXS({ imagen, categoria, idCategoria, onClick,
  arrayFilter, seleccionState}) {

  const [seleccion, setSeleccion] = useState(seleccionState);



  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);
  
  const handleClick = () => {
    setSeleccion(!seleccion);
    onClick(idCategoria);
  };
  
  //estilo para el 'strip' contenedor de texto
  const stripStylesInactive = {
    position: 'absolute',
    bottom: '0px',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 85, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
  };
  
  const stripStylesActive = {
    position: 'absolute',
    bottom: '0px',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
  };


  return (
    <Button sx={{
      padding:'0'}
    
    }
    onClick={handleClick}>
    <Card
      sx={{
        width: '300px',
        height: '50px',
        position: 'relative',
        margin: '10px',
      }} 
    >
             
        <CardMedia
          component='img'
          image={imagen}
          title={categoria}
          height='100%'
          
        />
      

      <Box sx={seleccion? stripStylesActive : stripStylesInactive}>
        <Typography variant='h5' component='div' color={'#FFFFFF'}>
          {categoria.toUpperCase()}
        </Typography>
      </Box>

  
    </Card>
    </Button>
  );
}
