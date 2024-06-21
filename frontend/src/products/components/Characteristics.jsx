import { Box, Container, Grid, Typography } from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ScaleIcon from "@mui/icons-material/Scale";
import StraightenIcon from "@mui/icons-material/Straighten";
import DoneIcon from "@mui/icons-material/Done";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ConstructionIcon from "@mui/icons-material/Construction";
import TuneIcon from "@mui/icons-material/Tune";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

const iconMapping = {
  "TIPO DE INSTRUMENTO": QueueMusicIcon,
  COLOR: ColorLensIcon,
  PESO: ScaleIcon,
  DIMENSIONES: StraightenIcon,
  MATERIAL: ConstructionIcon,
  CONTROLES: TuneIcon,
  INCLUYE: AttachFileIcon,
  CONDICION: DoneIcon,
};

export const Characteristics = ({ instrumento }) => {
  const { caracteristicas } = instrumento;

  if (!caracteristicas || caracteristicas.length === 0) {
    return (
      <Box sx={{ backgroundColor: "background.main", padding: 3 }}>
        <Typography>No hay características disponibles.</Typography>
      </Box>
    );
  }
  return (
    <>
      <Grid container columns={{ xs: 12, sm: 12 }} rowSpacing={1}>
        {caracteristicas.map((caracteristica, index) => {
          const IconComponent =
            iconMapping[caracteristica.nombre.toUpperCase()] || TuneIcon;

          return (
            <Grid
              item
              xs={12}
              sm={6}
              paddingLeft={1}
              sx={{ display: "flex" }}
              key={index}
            >
              <IconComponent />
              <Grid>
                <Typography paddingLeft={2} fontWeight={600}>
                  {caracteristica.nombre.toUpperCase()}:
                </Typography>
                <Typography variant="subtitle1" paddingLeft={2}>
                  {caracteristica.valor}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
