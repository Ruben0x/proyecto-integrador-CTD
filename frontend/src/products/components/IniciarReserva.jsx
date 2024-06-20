import Checkbox from "@mui/material/Checkbox";
import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from 'react';

const IniciarReserva = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
         padding: 20,
      }}
    >
      <Button
        style={{ maxWidth: "250px" }}
        fullWidth
        variant="contained"
        onClick={() => handleReserva(values)}
        
      >
        <Typography sx={{
                    fontSize:20,
                    fontWeight: 600,
                    color:'#121312'
                  }}>
        INICIAR RESERVA
        </Typography>
        
      </Button>
      <div style={{ marginTop: "1em" }}>
      <div style={{marginTop:"1em" }}>
        <Checkbox defaultChecked />
        He leído y estoy de acuerdo con las políticas de reserva
      </div>
    </div>
  );
};

export default IniciarReserva;
