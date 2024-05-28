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
import logoWhite from '../assets/img/LogoWhite.png';
import { Button } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ListAllProducts } from './components/ListAllProducts';
import { ListAllUsuarios } from './components/ListAllUsuarios';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

const drawerWidth = '25%';

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
          <ListItem onClick={() => setMenuData('Agregar')}>
            <ListItemButton
              selected={menuData === 'Agregar'}
              sx={{
                '&.Mui-selected, &.Mui-selected:hover ': {
                  backgroundColor: 'primary.main',
                },
                backgroundColor: '#898989',
                ':hover': { backgroundColor: 'primary.main' },
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary='Agregar Producto' />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => setMenuData('Listar')}>
            <ListItemButton
              selected={menuData === 'Listar'}
              sx={{
                '&.Mui-selected, &.Mui-selected:hover ': {
                  backgroundColor: 'primary.main',
                },
                backgroundColor: '#898989',
                ':hover': { backgroundColor: 'primary.main' },
              }}
            >
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary='Listar Productos' />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => setMenuData('TodosUsuarios')}>
            <ListItemButton
              selected={menuData === 'TodosUsuarios'}
              sx={{
                '&.Mui-selected, &.Mui-selected:hover ': {
                  backgroundColor: 'primary.main',
                },
                backgroundColor: '#898989',
                ':hover': { backgroundColor: 'primary.main' },
              }}
            >
              <ListItemIcon>
                <RecentActorsIcon />
              </ListItemIcon>
              <ListItemText primary='Listar Usuarios' />
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
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          backgroundColor: 'background.main',
          height: '100vh',
        }}
      >
        <Toolbar />
        {menuData == 'Agregar' && <AddProductPage />}
        {menuData == 'Listar' && <ListAllProducts />}
        {menuData == 'TodosUsuarios' && <ListAllUsuarios />}
      </Box>
    </Box>
  );
};
