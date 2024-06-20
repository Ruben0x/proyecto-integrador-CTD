import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import ShareIcon from "@mui/icons-material/Share";
import { Link as RouterLink, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { Characteristics } from "../components/Characteristics";
import { GridImagenes } from "../components/GridImagenes";
import { GlobalUserDataContext } from "../../auth/helpers/globalUserData";
import { ProductCalendar } from "../components/ProductCalendar";
import Politicas from "../components/Politicas";
import { useUsers } from "../../context/store/UsersProvider";
import { useFavoritos } from "../../context/store/FavoritosProvider";
import { toast } from "sonner";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import SimplePopup from "../../components/SharePopup";
import { userProductos } from "../../context/store/ProductosProvider";
import { useInstrumento } from "../hooks/useInstrumento";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IniciarReserva from "../components/IniciarReserva";
import InstrumentoInfo from "../components/InstrumentoInfo";
import Precio from "../components/Precio";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const ProductPage = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const { id } = useParams();
  const { isLogged, globalUserData } = useContext(GlobalUserDataContext);
  const { deleteFavs, addFavoritos } = useFavoritos();
  const { userState } = useUsers();
  const { addFav, deleteFav } = userProductos();
  const accessToken =
    userState?.token?.accessToken || sessionStorage.getItem("token");
  const { instrumento, listaImagenes, error } = useInstrumento(id, accessToken);
  const [favs, setFavs] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (instrumento) {
      setFavs(instrumento.esFavorito);
    }
  }, [instrumento]);

  if (error) return <Navigate to={"/404"} />;

  if (!instrumento) return <CircularProgress />;

  const shareUrl = `${import.meta.env.VITE_LOCAL_URL}/instrumentos/${id}`;
  const title = "Mira este fabuloso instrumento! ";

  const handleAddFavs = () => {
    addFavoritos(globalUserData.id, instrumento.id);
    addFav(instrumento.id);
    toast.success("Agregado a favoritos");
    setFavs(true);
    setRefresh(!refresh);
  };

  const handleAcceptDelete = (user, producto) => {
    deleteFavs(user, producto);
    deleteFav(producto);
    toast.success("Eliminado de favoritos");
    setFavs(false);
    setDeleteModal(false);
    setRefresh(!refresh);
  };
  const handleClickOpen = () => setDeleteModal(true);

  const handleClose = () => setDeleteModal(false);

  const AccordionSection = ({ title, content }) => (
    <Accordion sx={{ backgroundColor: "#F9E9DE", color: "#121312" }}>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls={`${title}-content`}
        id={`${title}-header`}
      >
        <Typography
          sx={{
            fontSize: 20,
            textDecoration: "underline",
            fontWeight: 600,
            padding: 2,
          }}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 4, backgroundColor: "#FCFBF7" }}>
        {content}
      </AccordionDetails>
    </Accordion>
  );

  const ReserveSection = () => (
    <Grid container display="flex" flexDirection="column">
      <ProductCalendar />
      <Container>
        <IniciarReserva />
      </Container>
    </Grid>
  );

  return (
    <Container sx={{ minHeight: "90vh", backgroundColor: "white" }}>
      {/* IMAGENES */}
      <Box>
        <Box paddingY={2}>
          <Link
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <WestIcon fontSize="medium" sx={{ paddingRight: 1 }} />
            <Typography>Volver al Home</Typography>
          </Link>
        </Box>
        <Typography
          variant="h3"
          sx={{
            color: "#ff5000",
            fontWeight: "600",
            textTransform: "uppercase",
          }}
        >
          {instrumento.nombreMarca}
          <span style={{ color: "#000000" }}> {instrumento.nombre}</span>
        </Typography>
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              margin: "1.5em",
              background: "#F9E9DE",
              borderRadius: "3em",
            }}
          >
            <SimplePopup url={shareUrl} title={title} />
            {isLogged && (
              <IconButton
                size="large"
                aria-label="add to favorites"
                onClick={favs ? handleClickOpen : handleAddFavs}
              >
                {favs ? (
                  <FavoriteIcon color="buttonRed" />
                ) : (
                  <FavoriteTwoToneIcon color="warning" />
                )}
              </IconButton>
            )}
          </Box>
          <GridImagenes listaImagenes={listaImagenes} />
        </Box>
      </Box>

      {/* DATA INSTRUMENTO */}
      <InstrumentoInfo instrumento={instrumento} />
      <Precio precio={instrumento.precio} />

      {/* Acordeones */}
      <Box sx={{ marginBottom: "10%" }}>
        <AccordionSection
          title="CARACTERÍSTICAS"
          content={<Characteristics instrumento={instrumento} />}
        />
        <AccordionSection
          title="POLÍTICAS DE RESERVA"
          content={<Politicas />}
        />
        <AccordionSection title="RESERVA AHORA" content={<ReserveSection />} />
      </Box>

      {/* Delete Modal */}
      <Dialog
        open={deleteModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
        sx={{ textAlign: "center" }}
      >
        <DialogContent>
          <ErrorOutlineOutlinedIcon sx={{ fontSize: 150 }} color="primary" />
        </DialogContent>
        <DialogTitle id="alert-dialog-title" fontWeight={600}>
          ¿Estás seguro?
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
            onClick={() =>
              handleAcceptDelete(globalUserData.id, instrumento.id)
            }
            autoFocus
          >
            ELIMINAR
          </Button>
          <Button variant="contained" color="buttonRed" onClick={handleClose}>
            CANCELAR
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
