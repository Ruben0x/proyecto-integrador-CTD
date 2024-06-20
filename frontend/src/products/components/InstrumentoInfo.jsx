import { Grid, Typography, Box } from "@mui/material";
import React from "react";

const InstrumentoInfo = ({ instrumento }) => (
  <Grid
    container
    sx={{ padding: 4, backgroundColor: "#121312", color: "#FFFFFF" }}
  >
    <InfoItem label="Categoría:" value={instrumento.nombreCategoria} />
    <InfoItem label="Marca:" value={instrumento.nombreMarca} />
    <InfoItem label="Modelo:" value={instrumento.nombre} />
    <InfoItem label="Descripción:" value={instrumento.descripcion} />
  </Grid>
);

const InfoItem = ({ label, value }) => (
  <>
    <Grid item xs={12} md={3}>
      <Typography variant="subtitle1" fontSize="1.5em">
        {label}
      </Typography>
    </Grid>
    <Grid item xs={12} md={9}>
      <Typography variant="subtitle1" fontSize="1.5em">
        <span style={{ color: "#FF5500", textTransform: "uppercase" }}>
          {value}
        </span>
      </Typography>
    </Grid>
  </>
);

export default InstrumentoInfo;
