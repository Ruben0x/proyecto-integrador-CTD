// import { useMemo, useState, useEffect } from 'react';

// import { Grid } from '@mui/material';

// export const GridImagenes = ({ listaImagenes = [] }) => {
//   const [imagenes, setImagenes] = useState([]);

//   useEffect(() => {
//     setImagenes(listaImagenes);
//   }, [listaImagenes]);

//   const renderImages = useMemo(() => {
//     if (!imagenes || imagenes.length === 0) return null;
//     return (
//       <Grid container spacing={1}>
//         <Grid item xs={12} md={6}>
//           {imagenes[0] && (
//             <img style={{ width: '100%' }} src={imagenes[0].url} alt='' />
//           )}
//         </Grid>
//         <Grid item xs={12} md={6} sm container columnSpacing={1}>
//           {imagenes.slice(1, 5).map((imagen, index) => (
//             <Grid item xs={12} md={6} key={index}>
//               <img style={{ width: '100%' }} src={imagen?.url || ''} alt='' />
//             </Grid>
//           ))}
//         </Grid>
//       </Grid>
//     );
//   }, [imagenes]);
//   return <>{renderImages}</>;
// };

import { useMemo, useState, useEffect } from "react";
import { Grid, Dialog, DialogContent } from "@mui/material";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export const GridImagenes = ({ listaImagenes = [] }) => {
  const [imagenes, setImagenes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setImagenes(listaImagenes);
  }, [listaImagenes]);

  const handleClick = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const renderImages = useMemo(() => {
    if (!imagenes || imagenes.length === 0) return null;
    return (
      <Grid container spacing={1} sx={{ marginTop: "50px" }}>
        <Grid item xs={12} md={6}>
          {imagenes[0] && (
            <img
              style={{ width: "100%", cursor: "pointer" }}
              src={imagenes[0].url}
              alt=""
              onClick={() => handleClick(0)}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} sm container columnSpacing={1}>
          {imagenes.slice(1, 5).map((imagen, index) => (
            <Grid item xs={12} md={6} key={index}>
              <img
                style={{ width: "100%", cursor: "pointer" }}
                src={imagen?.url || ""}
                alt=""
                onClick={() => handleClick(index + 1)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }, [imagenes]);

  return (
    <>
      {renderImages}
      <Lightbox
        open={isOpen}
        close={handleClose}
        slides={imagenes.map((imagen) => ({ src: imagen.url }))}
        index={currentIndex}
        onIndexChange={setCurrentIndex}
      />
    </>
  );
};
