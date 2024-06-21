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
  const [productos, setProductos] = useState([]);

  // if (isLoading) return 'Cargando ...';

  const handleFormSubmit = (values) => {
    console.log("data recibida");
  };

  const filterProductos = async () => {
    const keyWord = query?.searchField?.toLowerCase();
    const payload = { token: loggedToken || userState.token.accessToken };

    if (keyWord) payload.text = keyWord;

    if (query.dates.length === 2) {
      const year1 = query.dates[0].getFullYear();
      const month1 = String(query.dates[0].getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
      const day1 = String(query.dates[0].getDate()).padStart(2, "0"); // Los días van de 1 a 31

      const year2 = query.dates[1].getFullYear();
      const month2 = String(query.dates[1].getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
      const day2 = String(query.dates[1].getDate()).padStart(2, "0"); // Los días van de 1 a 31

      const fechaDesde = `${year1}-${month1}-${day1}`;
      const fechaHasta = `${year2}-${month2}-${day2}`;

      payload.date1 = fechaDesde;
      payload.date2 = fechaHasta;
    }

    const productos = await searchProducts(payload);
    setProductos(productos);
  };

  useEffect(() => {
    const fetchProductos = async () => {
      await filterProductos();
    };

    fetchProductos();
  }, [query]);

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
