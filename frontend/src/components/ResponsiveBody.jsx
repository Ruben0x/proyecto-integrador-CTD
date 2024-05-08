import * as React from 'react';
//import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';



const ResponsiveBody = () => {
    //const {state, dispatch} = useGlobalStates();

return(

    <Stack spacing={2}
       sx={{
        height: '100vh',
        backgroundColor: '#F9E9DE',
        }}>
        <section class="secBuscador" >Buscador</section> 
        <section class= "secCategorias">Categorías</section>
        <section class = "secRecomendados">Recomendados</section>
    </Stack>

)

}
export default ResponsiveBody;