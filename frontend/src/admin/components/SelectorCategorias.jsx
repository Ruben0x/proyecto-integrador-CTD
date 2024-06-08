import * as React from 'react';
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
import { useCategorias } from '../../helpers/useCategorias';

export function SimpleDialog(props) {
  const arrayCategorias = useCategorias();
  const { onClose, selectedValue, selectedId, open } = props;

  const handleClose = () => {
    onClose(selectedValue, selectedId);
  };

  const handleListItemClick = (value, id) => {
    onClose(value, id);
  };

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

/*
export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(arrayCategorias[0].nombre);
  const [selectedId, setSelectedId] = React.useState(arrayCategorias[0].id);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value, id) => {
    setOpen(false);
    setSelectedValue(value);
    setSelectedId(id);
  };

  return (
    <div>

      <TextField fullWidth label="Categoría" onClick={handleClickOpen}>
        {selectedValue}
      </TextField>
      <SimpleDialog
        selectedValue={selectedValue}
        selectedId={selectedId}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
*/
