// //import { Link } from 'react-router-dom';
// import Stack from "@mui/material/Stack";
// import Container from "@mui/material/Container";
// import { Grid, Link } from "@mui/material";
// import Typography from "@mui/material/Typography";
// import { GridInstrumentosResult } from "./GridInstrumentosResult";
// import { useLocation, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import SearchSection from "./SearchSection";
// import { ItemsContext } from "../context/ItemsContext";
// import BaseHardcoded from "../../src/helpers/baseProductosHardcode.json";

// const ItemsSearch = () => {
//   const location = useLocation();
//   const query = location.state.query;
//   console.log(query);

//   const handleFormSubmit = (values) => {
//     console.log("data recibida");
//     console.log(values);
//     //
//   };

//   const [productosTodos, setProductosTodos] = useState([]);
//   const [productos, setProductos] = useState([]);

//   if (!productos) {
//     return <Navigate to={"/"} />;
//   }
//   useEffect(() => {
//     const transformedData = BaseHardcoded.map((producto) => {
//       return {
//         ...producto,
//         imagenes: producto.imagenes.map((imagen) => imagen.url),
//       };
//     });
//     setProductosTodos(transformedData);
//     setProductos(transformedData);
//   }, []);

//   useEffect(() => {
//     if (query.searchField) {
//       const keyWord = query.searchField;
//       const temporalArray = productosTodos.filter((producto) => {
//         return [
//           producto.nombre,
//           producto.descripcion,
//           producto.nombreCategoria,
//           producto.nombreMarca,
//         ].some((field) => {
//           return field.toLowerCase().includes(keyWord.toLowerCase());
//         });
//       });
//       // remove duplicates from temporalArray based on product id
//       const uniqueTemporalArray = temporalArray.filter((producto, index) => {
//         return (
//           temporalArray.findIndex((item) => item.id === producto.id) === index
//         );
//       });
//       setProductos(uniqueTemporalArray);
//     }else {
//       setProductos(productosTodos);
//     }
//   }, [query.searchField, productosTodos]);

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <Stack
//         spacing={0}
//         sx={{
//           width: "100%",
//         }}
//       >
//         {/*Seccion buscador*/}
//         <SearchSection onSubmit={handleFormSubmit} />

//         {/*Seccion recomendados del Body*/}
//         <Container
//           className="section-categorias-result"
//           sx={{
//             width: "100%",
//             minHeight: "300px",
//             height: "100%",
//             textAlign: "center",
//             padding: "30px",
//           }}
//         >
//           <Grid container justifyContent={"center"} columnSpacing={1}>
//             <Grid item>
//               <Typography
//                 fontWeight="800"
//                 sx={{ fontSize: { xs: 30, md: 40 } }}
//               >
//                 {`Resultados para ${query.searchField}`}
//               </Typography>
//             </Grid>
//             <Grid item></Grid>
//           </Grid>

//           <GridInstrumentosResult productos={productos} />
//         </Container>
//       </Stack>
//     </div>
//   );
// };
// export default ItemsSearch;

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import { GridInstrumentosResult } from "./GridInstrumentosResult";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchSection from "./SearchSection";

const ItemsSearch = () => {
  const location = useLocation();
  const query = location.state.query;

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/productos");
        if (response.data) {
          setProductos(response.data);
        }
      } catch (error) {
        console.error("Error fetching productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const handleFormSubmit = (values) => {
    console.log("data recibida");
    // console.log(values);
    // Aquí puedes realizar alguna acción con los valores del formulario si es necesario
  };

  const filterProductos = () => {
    if (query.searchField) {
      const keyWord = query.searchField.toLowerCase();
      return productos.filter((producto) => {
        return (
          producto.nombre.toLowerCase().includes(keyWord) ||
          producto.descripcion.toLowerCase().includes(keyWord) ||
          producto.nombreCategoria.toLowerCase().includes(keyWord) ||
          producto.nombreMarca.toLowerCase().includes(keyWord)
        );
      });
    } else {
      return productos;
    }
  };

  const filteredProductos = filterProductos();

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
                <span>{query.searchField}</span>
              </Typography>
            </Grid>
          </Grid>

          <GridInstrumentosResult productos={filteredProductos} />
        </Container>
      </Stack>
    </div>
  );
};

export default ItemsSearch;
