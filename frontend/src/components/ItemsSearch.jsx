import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import { GridInstrumentosResult } from "./GridInstrumentosResult";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchSection from "./SearchSection";
import { userProductos } from "../context/store/ProductosProvider";
import { useUsers } from "../context/store/UsersProvider";

const ItemsSearch = () => {
  const location = useLocation();
  const query = location.state.query;

  const loggedToken = sessionStorage.getItem("token");
  const { searchProducts } = userProductos();
  const { userState } = useUsers();
  const [productos, setProductos] = useState([])


  // if (isLoading) return 'Cargando ...';

  const handleFormSubmit = (values) => {
    console.log("data recibida");
    // console.log(values);
    // Aquí puedes realizar alguna acción con los valores del formulario si es necesario
  };

  const filterProductos = async () => {
    if (Array.isArray(query)) {
      return query;
    } else if (query.searchField) {
      const keyWord = query.searchField.toLowerCase();
      const productos = await searchProducts({ token: loggedToken || userState.token.accessToken, text: keyWord })
      setProductos(productos)
    } else {
      return productos;
    }
  };

  
  useEffect(() => {
    const fetchProductos = async () => {
      await filterProductos();
    };

    fetchProductos();

  }, [query])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack
        spacing={0}
        sx={{
          width: "100%",
        }}
      >
        {/* Sección buscador */}
        <SearchSection onSubmit={handleFormSubmit} />

        {/* Sección de resultados */}
        <Container
          className="section-categorias-result"
          sx={{
            width: "100%",
            minHeight: "300px",
            height: "100%",
            textAlign: "center",
            padding: "30px",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          <Grid container justifyContent="center" columnSpacing={1}>
            <Grid item>
              <Typography
                fontWeight="800"
                sx={{
                  fontSize: { xs: 30, md: 40 },
                  "& span": {
                    color: "#ff5500",
                  },
                }}
              >
                {`Resultados para `}
                <span>{query.searchField || "productos seleccionados"}</span>
              </Typography>
            </Grid>
          </Grid>

          <GridInstrumentosResult productos={productos} />
        </Container>
      </Stack>
    </div>
  );
};

export default ItemsSearch;
