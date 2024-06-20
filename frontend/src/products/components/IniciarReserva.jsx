import Checkbox from "@mui/material/Checkbox";
import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

const IniciarReserva = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Button
        fullWidth
        variant="contained"
        onClick={() => handleReserva(values)}
        sx={{
          fontSize: 20,
          fontWeight: 600,
          color: "#121312",
          maxWidth: "250px",
        }}
      >
        INICIAR RESERVA
      </Button>
      <div style={{ marginTop: "1em" }}>
        <Checkbox defaultChecked />
        He leído y estoy de acuerdo con las políticas de reserva
      </div>
    </div>
  );
};

export default IniciarReserva;
