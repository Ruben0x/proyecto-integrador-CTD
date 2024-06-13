// import React, { useContext, useEffect, useState } from "react";
// import { useFavoritos } from "../../context/store/FavoritosProvider";
// import { GlobalUserDataContext } from "../helpers/globalUserData";
// import {
//   Box,
//   Button,
//   Container,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import Avatar from "@mui/material/Avatar";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
// import { Link } from "react-router-dom";
// import { toast } from "sonner";

// export const TableAllFavs = () => {
//   const { getAllFavoritos, isLoading, favState, deleteFavs } = useFavoritos();
//   const { globalUserData } = useContext(GlobalUserDataContext);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [favorito, setFavorito] = useState();

//   useEffect(() => {
//     getAllFavoritos(globalUserData.id);
//   }, []);

//   const handleClickOpen = (favorito) => {
//     setFavorito(favorito);
//     setDeleteModal(true);
//   };

//   const handleClose = () => {
//     setDeleteModal(false);
//   };

//   if (isLoading) return "Cargando...";

//   const handleAcceptDelete = (user, producto) => {
//     deleteFavs(user, producto);
//     toast.success("Eliminado de favoritos");

//     setDeleteModal(false);
//   };

//   return (
//     <>
//       <Container
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//           marginTop: 2,
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           FAVORITOS
//         </Typography>
//         <Box sx={{ width: "100%", textAlign: "center" }}>
//           {favState.favoritos.length === 0 ? (
//             <Typography variant="body1" color="textSecondary">
//               Tu lista de favoritos se encuentra vacía
//             </Typography>
//           ) : (
//             <List>
//               {favState.favoritos.map((fav) => (
//                 <ListItem
//                   key={fav.producto.id}
//                   sx={{ display: "flex", alignItems: "center" }}
//                 >
//                   <ListItemAvatar>
//                     <Avatar
//                       src={fav.producto.imagenUrl}
//                       alt={fav.producto.nombre}
//                       sx={{ width: 50, height: 50 }}
//                     />
//                   </ListItemAvatar>
//                   <ListItemText
//                     primary={
//                       <Typography
//                         variant="body1"
//                         component="span"
//                         fontWeight="bold"
//                       >
//                         <Link
//                           to={`/instrumentos/${fav.producto.id}`}
//                           style={{ textDecoration: "none", color: "inherit" }}
//                         >
//                           {fav.producto.nombre}
//                         </Link>
//                       </Typography>
//                     }
//                     secondary={
//                       <span>
//                         <Typography
//                           variant="body2"
//                           component="span"
//                         >{`Categoría: ${fav.producto.categoriaS.nombre}`}</Typography>
//                         <Typography
//                           variant="body2"
//                           component="span"
//                         >{`Marca: ${fav.producto.marcaS.nombre}`}</Typography>
//                       </span>
//                     }
//                   />
//                   <Button
//                     size="small"
//                     variant="contained"
//                     color="buttonRed"
//                     onClick={() => handleClickOpen(fav.producto)}
//                     startIcon={
//                       <DeleteOutlineOutlinedIcon style={{ color: "white" }} />
//                     }
//                   >
//                     <Typography fontWeight={600} style={{ color: "white" }}>
//                       Eliminar
//                     </Typography>
//                   </Button>
//                 </ListItem>
//               ))}
//             </List>
//           )}
//         </Box>
//       </Container>
//       {deleteModal && (
//         <Dialog
//           open={deleteModal}
//           onClose={handleClose}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//           fullWidth={true}
//           maxWidth={"xs"}
//           sx={{ textAlign: "center" }}
//         >
//           <DialogContent>
//             <ErrorOutlineOutlinedIcon sx={{ fontSize: 150 }} color="primary" />
//           </DialogContent>
//           <DialogTitle id="alert-dialog-title" fontWeight={600}>
//             {"¿Estas seguro?"}
//           </DialogTitle>
//           <DialogContent>
//             <DialogContentText id="alert-dialog-description" fontWeight={600}>
//               Esta acción eliminará al producto de sus Favoritos
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions sx={{ justifyContent: "center" }}>
//             <Button
//               variant="contained"
//               color="buttonGreen"
//               onClick={() => handleAcceptDelete(globalUserData.id, favorito.id)}
//               autoFocus
//               sx={{ color: "white" }}
//             >
//               ELIMINAR
//             </Button>
//             <Button
//               variant="contained"
//               color="buttonRed"
//               onClick={handleClose}
//               sx={{ color: "white" }}
//             >
//               CANCELAR
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </>
//   );
// };

import React, { useContext, useEffect, useState } from "react";
import { useFavoritos } from "../../context/store/FavoritosProvider";
import { GlobalUserDataContext } from "../helpers/globalUserData";
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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { userProductos } from "../../context/store/ProductosProvider";

export const TableAllFavs = () => {
  const { getAllFavoritos, isLoading, favState, deleteFavs } = useFavoritos();
  const { deleteFav } = userProductos();
  const { globalUserData } = useContext(GlobalUserDataContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [favorito, setFavorito] = useState();

  useEffect(() => {
    getAllFavoritos(globalUserData.id);
  }, []);

  const handleClickOpen = (favorito) => {
    setFavorito(favorito);
    setDeleteModal(true);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  const handleAcceptDelete = (user, producto) => {
    deleteFavs(user, producto);
    deleteFav(producto);
    toast.success("Eliminado de favoritos");
    setDeleteModal(false);
  };
  if (isLoading) return <CircularProgress />;

  return (
    <>
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
          FAVORITOS
        </Typography>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          {favState.favoritos.length === 0 ? (
            <Typography variant="body1" color="textSecondary">
              Tu lista de favoritos se encuentra vacía
            </Typography>
          ) : (
            <List sx={{ width: "100%", maxWidth: 600, mx: "auto" }}>
              {favState.favoritos.map((fav) => (
                <ListItem
                  key={fav.producto.id}
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
                      src={fav.producto.imagenUrl}
                      alt={fav.producto.nombre}
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
                        <Link
                          to={`/instrumentos/${fav.producto.id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {fav.producto.nombre}
                        </Link>
                      </Typography>
                    }
                    secondary={
                      <Box component="span">
                        <Typography
                          variant="body2"
                          component="span"
                          display="block"
                        >
                          {`Categoría: ${fav.producto.categoriaS.nombre}`}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="span"
                          display="block"
                        >
                          {`Marca: ${fav.producto.marcaS.nombre}`}
                        </Typography>
                      </Box>
                    }
                    sx={{ flex: 1, minWidth: 200 }}
                  />
                  <Button
                    size="small"
                    variant="contained"
                    color="buttonRed"
                    onClick={() => handleClickOpen(fav.producto)}
                    startIcon={
                      <DeleteOutlineOutlinedIcon style={{ color: "white" }} />
                    }
                    sx={{ minWidth: "auto" }}
                  >
                    <Typography fontWeight={600} style={{ color: "white" }}>
                      Eliminar
                    </Typography>
                  </Button>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Container>
      {deleteModal && (
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
              onClick={() => handleAcceptDelete(globalUserData.id, favorito.id)}
              autoFocus
              sx={{ color: "white" }}
            >
              ELIMINAR
            </Button>
            <Button
              variant="contained"
              color="buttonRed"
              onClick={handleClose}
              sx={{ color: "white" }}
            >
              CANCELAR
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
