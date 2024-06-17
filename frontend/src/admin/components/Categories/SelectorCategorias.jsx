import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import { useCategorias } from '../../../context/store/CategoriasProvider';
import { useEffect } from 'react';
// import { useCategorias } from '../../../helpers/useCategorias';

export function SimpleDialog(props) {
  const { onClose, selectedValue, selectedId, open } = props;
  const { getAllCategorias, categoryState, isLoading } = useCategorias();
  const arrayCategorias = categoryState.categorias;

  useEffect(() => {
    getAllCategorias();
  }, []);

  const handleClose = () => {
    onClose(selectedValue, selectedId);
  };

  const handleListItemClick = (value, id) => {
    onClose(value, id);
  };

  // if (isLoading) return 'Cargando ...';
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Selecciona una categoría</DialogTitle>
      <List sx={{ pt: 0 }}>
        {arrayCategorias.map((item) => (
          <ListItem disableGutters key={item.id}>
            <ListItemButton
              onClick={() => handleListItemClick(item.nombre, item.id)}
            >
              <ListItemAvatar>
                <Avatar
                  src={item.img}
                  sx={{
                    width: 70,
                    height: 70,
                    '& img': {
                      width: '150%',
                      height: '150%',
                    },
                  }}
                ></Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.nombre.toUpperCase()} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('Agregar')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Agregar ...' />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  // selectedId: PropTypes.number.isRequired,
};
