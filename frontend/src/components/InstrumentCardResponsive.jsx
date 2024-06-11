import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import ShareIcon from "@mui/icons-material/Share";
import { toast } from "sonner";
import {
  Box,
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { GlobalUserDataContext } from "../auth/helpers/globalUserData";
import { useFavoritos } from "../context/store/FavoritosProvider";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { addFavoritos } from "../context/store/FavoritosProvider";

export const InstrumentCardResponsive = ({ instrument, onFavChange }) => {
  const [favs, setFavs] = useState(instrument.esFavorito);
  const [deleteModal, setDeleteModal] = useState(false);

  const { isLogged, globalUserData } = useContext(GlobalUserDataContext);
  const { deleteFavs, isLoading, addFavoritos } = useFavoritos();

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
    addFavoritos(globalUserData.id, id);
    toast.success(nombre + " agregado a favoritos");
    setFavs(true);
    onFavChange();
  };
  const handleClickOpen = (favorito) => {
    setDeleteModal(true);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  const handleAcceptDelete = (user, producto) => {
    deleteFavs(user, producto);
    toast.success(nombre + " eliminado de favoritos");
    setFavs(false);
    setDeleteModal(false);
    onFavChange();
  };
  if (isLoading) return "Cargando...";

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
    <>
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
            <IconButton aria-label="share">
              <ShareIcon color="primary" />
            </IconButton>

            {favs ? (
              <IconButton
                size="large"
                aria-label="add to favorites"
                onClick={handleClickOpen}
              >
                <FavoriteIcon color="buttonRed" />
              </IconButton>
            ) : (
              <IconButton
                size="large"
                aria-label="add to favorites"
                onClick={handleAddFavs}
              >
                <FavoriteTwoToneIcon color="warning" />
              </IconButton>
            )}
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
          <Box
            sx={{ display: "flex", flexDirection: "column", width: "300px" }}
          >
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                component="div"
                variant="h5"
                fontWeight="bold"
                color="primary"
              >
                {nombreMarca}
              </Typography>
              <Typography
                variant="h6"
                color="white"
                component="div"
                paddingY={1}
              >
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
      {deleteModal && (
        <Dialog
          open={deleteModal}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth={"xs"}
          sx={{ textAlign: "center" }}
        >
          <DialogContent>
            <ErrorOutlineOutlinedIcon sx={{ fontSize: 150 }} color="primary" />
          </DialogContent>
          <DialogTitle id="alert-dialog-title" fontWeight={600}>
            {"¿Estas seguro?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" fontWeight={600}>
              Esta acción eliminará al producto de sus Favoritos
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              color="buttonGreen"
              onClick={() => handleAcceptDelete(globalUserData.id, id)}
              autoFocus
            >
              ELIMINAR
            </Button>
            <Button variant="contained" color="buttonRed" onClick={handleClose}>
              CANCELAR
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
