import React, { useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const locations = [
  {
    id: 1,
    key: "ARICA",
    location: { lat: -18.478253, lng: -70.312599 },
    address: "Calle 21 de Mayo 123, Arica",
  },
  {
    id: 2,
    key: "IQUIQUE",
    location: { lat: -20.214943, lng: -70.151267 },
    address: "Av. Arturo Prat 456, Iquique",
  },
  {
    id: 3,
    key: "ANTOFAGASTA",
    location: { lat: -23.652364, lng: -70.395403 },
    address: "Av. Argentina 789, Antofagasta",
  },
  {
    id: 4,
    key: "COPIAPO",
    location: { lat: -27.36679, lng: -70.33128 },
    address: "Av. Copayapu 1011, Copiapó",
  },
  {
    id: 5,
    key: "LASERENA",
    location: { lat: -29.903503, lng: -71.247227 },
    address: "Calle Los Carrera 1314, La Serena",
  },
  {
    id: 6,
    key: "VALPARAISO",
    location: { lat: -33.045852, lng: -71.6205 },
    address: "Av. Pedro Montt 1516, Valparaíso",
  },
  {
    id: 7,
    key: "SANTIAGO",
    location: { lat: -33.440289, lng: -70.653947 },
    address: "Av. Libertador Bernardo O'Higgins 1718, Santiago",
  },
  {
    id: 8,
    key: "RANCAGUA",
    location: { lat: -34.170131, lng: -70.739781 },
    address: "Av. Brasil 1920, Rancagua",
  },
  {
    id: 9,
    key: "TALCA",
    location: { lat: -35.426563, lng: -71.655412 },
    address: "Calle 1 Sur 2122, Talca",
  },
  {
    id: 10,
    key: "CHILLAN",
    location: { lat: -36.606261, lng: -72.103363 },
    address: "Av. Argentina 2324, Chillán",
  },
  {
    id: 11,
    key: "CONCEPCION",
    location: { lat: -36.827132, lng: -73.04967 },
    address: "Av. O'Higgins 2526, Concepción",
  },
  {
    id: 12,
    key: "TEMUCO",
    location: { lat: -38.732318, lng: -72.590132 },
    address: "Calle Caupolicán 2728, Temuco",
  },
  {
    id: 13,
    key: "VALDIVIA",
    location: { lat: -39.808026, lng: -73.245672 },
    address: "Av. Picarte 2930, Valdivia",
  },
  {
    id: 14,
    key: "PUERTOMONTT",
    location: { lat: -41.469906, lng: -72.941136 },
    address: "Av. Diego Portales 3132, Puerto Montt",
  },
  {
    id: 15,
    key: "COYHAIQUE",
    location: { lat: -45.571432, lng: -72.06834 },
    address: "Calle Simpson 3334, Coyhaique",
  },
  {
    id: 16,
    key: "PUNTAARENAS",
    location: { lat: -53.161929, lng: -70.910199 },
    address: "Av. Colón 3536, Punta Arenas",
  },
];

const GoogleMaps = ({ onLocationSelect }) => {
  const [selectedSucursal, setSelectedSucursal] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: -33.440289,
    lng: -70.653947,
  });
  const [mapZoom, setMapZoom] = useState(3);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleSucursalClick = (location, id, address) => {
    setSelectedSucursal(location);
    setMapCenter(location);
    setMapZoom(15);
    setSelectedId(id);
    setSelectedAddress(address);
  };

  const handleSendLocation = () => {
    if (selectedId !== null && onLocationSelect) {
      onLocationSelect(selectedId, selectedAddress);
    }
  };

  return (
    <Container>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "30px", marginBottom: "30px" }}
      >
        <Grid item xs={12} md={6} sx={{ backgroundColor: "#F9E9DE" }}>
          <Typography
            variant="h4"
            sx={{ color: "#ff5500", fontWeight: "900", marginBottom: "10px" }}
          >
            SUCURSALES DISPONIBLES:
          </Typography>
          <Typography variant="h6">
            Selecciona el lugar que se más te acomode
          </Typography>
          <List>
            {locations.map((location) => (
              <ListItem
                button
                key={location.key}
                onClick={() =>
                  handleSucursalClick(
                    location.location,
                    location.id,
                    location.address
                  )
                }
              >
                <ListItemText primary={location.key} />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <APIProvider apiKey={API_KEY}>
            <div
              style={{
                width: "100%",
                height: "500px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Map
                style={{ width: "100%", height: "100%" }}
                center={mapCenter}
                zoom={mapZoom}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
                onLoad={(map) => {
                  const marker = new google.maps.Marker({
                    position: mapCenter,
                    map: map,
                  });

                  if (selectedSucursal) {
                    marker.setPosition(selectedSucursal);
                    marker.setMap(map);
                  }
                }}
              />
            </div>
          </APIProvider>
          {selectedAddress && (
            <Typography variant="body1" sx={{ marginTop: "20px" }}>
              Dirección: {selectedAddress}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px" }}
            onClick={handleSendLocation}
          >
            SELECCIONAR PUNTO DE RETIRO
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GoogleMaps;
