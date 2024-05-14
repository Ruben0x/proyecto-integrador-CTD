import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';




export default function MediaCard({imagen, categoria}) {
    
    //estilo para el 'strip' contenedor de texto
    const stripStyles = {
        position: "absolute",
        bottom: "10px",
        left: "0",
        width: "260px",
        height: "50px",
        backgroundColor: "rgba(255, 85, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        paddingLeft: "10px"
      }

    return (
        <Card sx={{ width: 300, height: 300, position: 'relative', margin:"10px"}}>
            <Link to={`/products/${categoria}`}>
                <CardMedia
                component='img'
                image={imagen}
                title={categoria}
                height='100%'
                />
                <Box sx={stripStyles}> 
                    <Typography variant="h5" component="div" color={"#FFFFFF"}>
                    {categoria}
                    </Typography>
                </Box>
            </Link>
        </Card>

  );
}