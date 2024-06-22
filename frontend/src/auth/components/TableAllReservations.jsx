import React from "react";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
} from "@mui/material";

export const TableAllReservations = ({ reservas = [] }) => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 2,
        padding: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        RESERVAS
      </Typography>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        {reservas.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No tienes reservas actualmente
          </Typography>
        ) : (
          <List sx={{ width: "100%", maxWidth: 600, mx: "auto" }}>
            {reservas.map((reserva) => (
              <ListItem
                key={reserva.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  padding: 1,
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={reserva.instrumento.imagenUrl}
                    alt={reserva.instrumento.nombre}
                    sx={{ width: 50, height: 50 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      component="span"
                      fontWeight="bold"
                    >
                      {reserva.instrumento.nombre}
                    </Typography>
                  }
                  secondary={
                    <Box component="span">
                      <Typography
                        variant="body2"
                        component="span"
                        display="block"
                      >
                        {`Fecha de inicio: ${reserva.fechaInicio}`}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        display="block"
                      >
                        {`Fecha de fin: ${reserva.fechaFin}`}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        display="block"
                      >
                        {`Sucursal: ${reserva.sucursal}`}
                      </Typography>
                    </Box>
                  }
                  sx={{ flex: 1, minWidth: 200 }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};
