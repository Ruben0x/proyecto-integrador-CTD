import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const InstrumentCard = ({ instrument }) => {
  console.log(instrument);

  const { id, nombre, categoria, predioDia, descripcion, imagenPrincipal } =
    instrument;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={imagenPrincipal}
        title='green iguana'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {nombre}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {descripcion}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size='small'>Share</Button> */}
        <Button size='small'>Ver más...</Button>
      </CardActions>
    </Card>
  );
};
