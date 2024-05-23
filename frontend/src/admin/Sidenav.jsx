import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AddProductPage } from './AddProductPage';
import AddIcon from '@mui/icons-material/Add';
import { AdminProductList } from './AdminProductList';
import logoportalsonoroprincipal from '../assets/img/logoportalsonoroprincipal.png';
import logoWhite from '../assets/img/LogoWhite.png';
import { Button, StyledEngineProvider, useTheme } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';

const drawerWidth = 240;

export const Sidenav = () => {
  const [menuData, setMenuData] = useState('Agregar');
  const navigate = useNavigate();

  return (
    <Box color='primary' sx={{ display: 'flex' }}>
      <CssBaseline />
      <Toaster position='top-right' richColors />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#000000',
            color: 'white',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <img src={logoWhite} alt='' />

        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding onClick={() => setMenuData('Agregar')}>
            <ListItemButton sx={{ backgroundColor: '#898989' }}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary='Agregar Producto' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => setMenuData('Listar')}>
            <ListItemButton sx={{ backgroundColor: '#898989' }}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary='Listar Productos' />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <Button
          onClick={() => {
            navigate('/');
          }}
        >
          Salir
        </Button>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1 }}>
        <Toolbar />
        {menuData == 'Agregar' && <AddProductPage />}
        {menuData == 'Listar' && <AdminProductList />}
      </Box>
    </Box>
  );
};
