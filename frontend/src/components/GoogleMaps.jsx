import React, { useState, useEffect } from "react";
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

const GoogleMaps = ({ onLocationSelect }) => {
  const [locations, setLocations] = useState([]);
  const [selectedSucursal, setSelectedSucursal] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: -33.440289,
    lng: -70.653947,
  });
  const [mapZoom, setMapZoom] = useState(3);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/sucursales`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const formattedData = data.map((item) => ({
          ...item,
          location: {
            lat: parseFloat(item.location.lat),
            lng: parseFloat(item.location.lng),
          },
          address: item.adress, // Corregir error tipográfico
        }));
        setLocations(formattedData);
      } catch (error) {
        console.error("Error fetching sucursales:", error);
      }
    };

    fetchSucursales();
  }, []);

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
            disabled={selectedId === null ? true : false}
          >
            CONFIRMAR PUNTO DE RETIRO
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GoogleMaps;
