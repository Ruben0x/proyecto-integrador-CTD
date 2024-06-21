import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const Precio = ({ precio }) => (
  <Box sx={{ padding: 4, backgroundColor: "#333333", color: "#FFFFFF" }}>
    <Grid container>
      <Grid item xs={12} md={3} sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle1" fontSize="1.5em">
          Costo de arriendo:
        </Typography>
      </Grid>
      <Grid item xs={12} md={9} sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle1" fontSize="1.5em">
          <span style={{ color: "#FF5500", fontSize: "1.5em" }}>
            ${new Intl.NumberFormat().format(precio)} x día
          </span>
        </Typography>
      </Grid>
    </Grid>
  </Box>
);

export default Precio;
