import React from 'react'
import { Typography, Box } from '@mui/material';


function Politicas() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: 2}}>
    <div>
      <ul>
        <li>✓ El instrumento debe ser devuelto en el mismo estado en que fue entregado</li>
        <li>✓ El arriendo del instrumento es válido hasta las 18:00 Hrs del último día de reserva. Después de esto, se aplicará una multa del doble del valor diario por cada día de atraso</li>
        <li>✓ El instrumento comprometido en la reserva es de uso exclusivo del usuario registrado que realiza la reserva, no se aceptarán situaciones atribuibles a terceros.</li>
        <li>✓ Es obligación y responsabilidad exclusiva del usuario registrado que realiza la reserva, el hacer que las políticas antes mencionadas sean cumplidas. Cualquier situación que afecte a lo anterior, puede estar sujeta a multas por parte de PORTAL SONORO</li>
      </ul>
    </div>
    </Box>
  )
}

export default Politicas
