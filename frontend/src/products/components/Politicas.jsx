import React from "react";
import { Typography, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";


function Politicas() {
  return (
    <Box sx={{ display: "flex", padding: 2, flexDirection: "column", overflow: 'hidden', textOverflow: 'ellipsis'}}>
      <div style={{ display: "flex", alignItems: "center" }}>
      <CheckIcon style={{ marginRight: 2 }} />
      {/* <span > */}
        <h4>Cuidados:</h4>
        </div>
        <Typography fontSize={10} variant="subtitle1" marginTop={2}>
          El instrumento debe ser devuelto en el mismo estado en que fue
          entregado. En caso de que el Instrumento sufra algún daño o deterioro, el Arrendatario deberá notificarlo inmediatamente a <b>PORTAL SONORO</b> y solicitar la reparación correspondiente.
        </Typography>
      {/* </span> */}
      <CheckIcon style={{ marginRight: 2 }} />
      <span>
        <h4>Duración:</h4>
        <Typography fontSize={10} variant="subtitle1" marginTop={2}>
          El arriendo del instrumento es válido hasta las 18:00 Hrs del último
          día de reserva. Después de esto, se aplicará una multa del doble del
          valor diario por cada día de atraso.
        </Typography>
      </span>
      <CheckIcon style={{ marginRight: 2 }} />
      <span>
        <h4>Exclusividad:</h4>
        <Typography fontSize={10} variant="subtitle1" marginTop={2}>
          El instrumento comprometido en la reserva es de uso exclusivo del
          usuario registrado que realiza la reserva, no se aceptarán situaciones
          atribuibles a terceros.
        </Typography>
      </span>
      <CheckIcon style={{ marginRight: 2 }} />
      <span>
        <h4>Uso Responsable:</h4>
        <Typography fontSize={10} variant="subtitle1" marginTop={2}>
          Es obligación y responsabilidad exclusiva del usuario registrado que
          realiza la reserva, el hacer que las políticas antes mencionadas sean
          cumplidas. Cualquier situación que afecte a lo anterior, puede estar
          sujeta a multas por parte de <b>PORTAL SONORO.</b>
        </Typography>
      </span>
      {/* <div> */}
      {/* <ul> */}
      {/* <li>✓ El instrumento debe ser devuelto en el mismo estado en que fue entregado</li> */}
      {/* <li>✓ El arriendo del instrumento es válido hasta las 18:00 Hrs del último día de reserva. Después de esto, se aplicará una multa del doble del valor diario por cada día de atraso</li> */}
      {/* <li>✓ El instrumento comprometido en la reserva es de uso exclusivo del usuario registrado que realiza la reserva, no se aceptarán situaciones atribuibles a terceros.</li> */}
      {/* <li>✓ Es obligación y responsabilidad exclusiva del usuario registrado que realiza la reserva, el hacer que las políticas antes mencionadas sean cumplidas. Cualquier situación que afecte a lo anterior, puede estar sujeta a multas por parte de PORTAL SONORO</li> */}
      {/* </ul> */}
      {/* </div> */}
    </Box>
  );
}

export default Politicas;
