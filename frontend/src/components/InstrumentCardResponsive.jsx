import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import ShareIcon from "@mui/icons-material/Share";
import { Box, CardActions, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { GlobalUserDataContext } from "../auth/helpers/globalUserData";
import { addFavoritos } from "../context/store/FavoritosProvider";

export const InstrumentCardResponsive = ({ instrument }) => {
  const [favs, setFavs] = useState(false);
  const { isLogged, globalUserData } = useContext(GlobalUserDataContext);

  const {
    id,
    nombre,
    descripcion,
    nombreCategoria,
    nombreMarca,
    precio,
    imagenes,
  } = instrument;

  // Función para obtener la URL de la imagen
  const obtenerUrlImagen = () => {
    let imageUrl = "";

    if (imagenes && imagenes.length > 0) {
      imageUrl = imagenes[0];
    } else if (imagenes && imagenes[0] && imagenes[0].url) {
      imageUrl = imagenes[0].url;
    }

    // Verificar si imageUrl es un objeto y extraer la URL de la propiedad "url"
    if (typeof imageUrl === "object" && imageUrl.url) {
      imageUrl = imageUrl.url;
    }

    return imageUrl;
  };

  const handleAddFavs = () => {
    setFavs(!favs);
    addFavoritos(globalUserData.id, id);
  };

  const stripStyles = {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "97%",
    height: "50px",
    backgroundColor: "rgba(137, 137, 137, 0.7)",
    display: "flex",
    alignItems: "center",
    paddingLeft: "10px",
  };

  return (
    <Card
      sx={{
        display: "flex",
        backgroundColor: "black",
        flexDirection: {
          xs: "column", // Vertical en pantallas pequeñas
          md: "row", // Horizontal en pantallas medianas
        },
        textAlign: "left",
        position: "relative",
      }}
    >
      {isLogged && (
        <CardActions
          disableSpacing
          sx={{ position: "absolute", top: 8, left: 8, zIndex: 1 }}
        >
          <IconButton
            size="large"
            aria-label="add to favorites"
            onClick={handleAddFavs}
          >
            {favs ? (
              <FavoriteIcon color="buttonRed" />
            ) : (
              <FavoriteTwoToneIcon color="warning" />
            )}
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon color="primary" />
          </IconButton>
        </CardActions>
      )}
      <Link
        to={`/instrumentos/${id}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Box sx={{ position: "relative", width: "300px" }}>
          <CardMedia
            component="img"
            sx={{ width: "300px", height: "300px" }}
            image={obtenerUrlImagen()}
            alt="Instrumento"
          />
          <Box sx={stripStyles}>
            <Typography variant="h5" component="div" color={"#FFFFFF"}>
              {nombreCategoria}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "300px" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              component="div"
              variant="h5"
              fontWeight="bold"
              color="primary"
            >
              {nombreMarca}
            </Typography>
            <Typography variant="h6" color="white" component="div" paddingY={1}>
              {nombre}
            </Typography>
            <Typography
              variant="h5"
              color="primary"
              component="div"
              sx={{ display: "flex", alignItems: "center" }}
            >
              ${precio} <Typography color="white"> /diario</Typography>
            </Typography>
            <Typography color="white" pt={1} variant="subtitle2">
              {descripcion}
            </Typography>
          </CardContent>
        </Box>
      </Link>
    </Card>
  );
};
