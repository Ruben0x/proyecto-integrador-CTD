import React, { useEffect, useState } from "react";
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

export const TableAllReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Datos ficticios de ejemplo
    const reservasHardcode = [
      {
        id: 1,
        instrumento: { nombre: "Guitarra", imagenUrl: "/images/guitar.png" },
        fechaInicio: "2024-07-01",
        fechaFin: "2024-07-10",
        sucursal: { nombre: "Sucursal A" },
      },
      {
        id: 2,
        instrumento: { nombre: "Piano", imagenUrl: "/images/piano.png" },
        fechaInicio: "2024-07-05",
        fechaFin: "2024-07-15",
        sucursal: { nombre: "Sucursal B" },
      },
    ];
    setReservations(reservasHardcode);
  }, []);

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
        {reservations.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No tienes reservas actualmente
          </Typography>
        ) : (
          <List sx={{ width: "100%", maxWidth: 600, mx: "auto" }}>
            {reservations.map((reservation) => (
              <ListItem
                key={reservation.id}
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
                    src={reservation.instrumento.imagenUrl}
                    alt={reservation.instrumento.nombre}
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
                      {reservation.instrumento.nombre}
                    </Typography>
                  }
                  secondary={
                    <Box component="span">
                      <Typography
                        variant="body2"
                        component="span"
                        display="block"
                      >
                        {`Fecha de inicio: ${reservation.fechaInicio}`}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        display="block"
                      >
                        {`Fecha de fin: ${reservation.fechaFin}`}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        display="block"
                      >
                        {`Sucursal: ${reservation.sucursal.nombre}`}
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
