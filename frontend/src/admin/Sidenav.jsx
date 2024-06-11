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
import AddIcon from '@mui/icons-material/Add';
import logoWhite from '../assets/img/LogoWhite.png';
import { Button, Collapse, Container } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { AdminHomePage } from './pages/AdminHomePage';
import { ListAllCaracteristicas } from './components/Characteristics/ListAllCaracteristicas';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import { ListAllProducts } from './components/Product/ListAllProducts';
import { ListAllUsuarios } from './components/Users/ListAllUsuarios';
import { AddCategoryForm } from './components/Categories/AddCategoryForm';
import { AddProductForm } from './components/Product/AddProductForm';
import { AddMarcaForm } from './components/Marcas/AddMarcaForm';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SettingsIcon from '@mui/icons-material/Settings';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
const drawerWidth = '20%';

export const Sidenav = () => {
  const [menuData, setMenuData] = useState('Home');
  const [openMarca, setOpenMarca] = useState(false);
  const [openProducto, setOpenProducto] = useState(false);
  const [openCategorias, setOpenCategorias] = useState(false);
  const [openUsuarios, setOpenUsuarios] = useState(false);
  const [openCaracteristicas, setOpenCaracteristicas] = useState(false);
  const handleClick = () => {
    setOpenMarca(!openMarca);
  };
  const handleProducto = () => {
    setOpenProducto(!openProducto);
  };
  const handleCategorias = () => {
    setOpenCategorias(!openCategorias);
  };
  const handleUsuarios = () => {
    setOpenUsuarios(!openUsuarios);
  };
  const handleCaracteristicas = () => {
    setOpenCaracteristicas(!openCaracteristicas);
  };

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
        <Box textAlign={'center'} marginTop={2}>
          <img src={logoWhite} alt='Logo_PortalSonoro' width={'80%'} />
        </Box>

        <Toolbar />
        <Divider />
        {/* <SideAcordeon /> */}
        <List sx={{ paddingX: '16px' }}>
          <ListItem onClick={() => setMenuData('Home')}>
            <ListItemButton
              selected={menuData === 'Home'}
              sx={{
                '&.Mui-selected, &.Mui-selected:hover ': {
                  backgroundColor: 'primary.main',
                },
                backgroundColor: '#898989',
                ':hover': { backgroundColor: 'primary.main' },
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>

          {/* //PRODUCTOS */}
          <ListItem>
            <ListItemButton
              onClick={handleProducto}
              sx={{
                '&.Mui-selected, &.Mui-selected:hover ': {
                  backgroundColor: 'primary.main',
                },
                backgroundColor: '#898989',
                ':hover': { backgroundColor: 'primary.main' },
              }}
            >
              <ListItemIcon>
                <MusicNoteIcon />
              </ListItemIcon>
              <ListItemText primary='Productos' />
              {openProducto ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openProducto} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem>
                <ListItemButton
                  selected={menuData === 'Agregar'}
                  sx={{
                    '&.Mui-selected, &.Mui-selected:hover ': {
                      backgroundColor: 'primary.main',
                    },
                    backgroundColor: '#909090',
                    ':hover': { backgroundColor: 'primary.main' },
                    marginRight: 2,
                  }}
                  onClick={() => setMenuData('Agregar')}
                >
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary='Agregar' />
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
                    marginRight: 2,
                  }}
                >
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText primary='Listar Productos' />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>

          {/* //USUARIOS */}
          <ListItem>
            <ListItemButton
              onClick={handleUsuarios}
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
              <ListItemText primary='Usuarios' />
              {openUsuarios ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openUsuarios} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem>
                <ListItemButton
                  selected={menuData === 'TodosUsuarios'}
                  sx={{
                    '&.Mui-selected, &.Mui-selected:hover ': {
                      backgroundColor: 'primary.main',
                    },
                    backgroundColor: '#909090',
                    ':hover': { backgroundColor: 'primary.main' },
                    marginRight: 2,
                  }}
                  onClick={() => setMenuData('TodosUsuarios')}
                >
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText primary='Lista de Usuarios' />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>

          {/* CATEGORIAS */}
          <ListItem>
            <ListItemButton
              onClick={handleCategorias}
              sx={{
                '&.Mui-selected, &.Mui-selected:hover ': {
                  backgroundColor: 'primary.main',
                },
                backgroundColor: '#898989',
                ':hover': { backgroundColor: 'primary.main' },
              }}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary='Categorias' />
              {openCategorias ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={openCategorias} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem>
                <ListItemButton
                  selected={menuData === 'AgregarCategorias'}
                  sx={{
                    '&.Mui-selected, &.Mui-selected:hover ': {
                      backgroundColor: 'primary.main',
                    },
                    backgroundColor: '#909090',
                    ':hover': { backgroundColor: 'primary.main' },
                    marginRight: 2,
                  }}
                  onClick={() => setMenuData('AgregarCategorias')}
                >
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary='Agregar' />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
          {/* //MARCAS */}
          <ListItem>
            <ListItemButton
              onClick={handleClick}
              sx={{
                '&.Mui-selected, &.Mui-selected:hover ': {
                  backgroundColor: 'primary.main',
                },
                backgroundColor: '#898989',
                ':hover': { backgroundColor: 'primary.main' },
              }}
            >
              <ListItemIcon>
                <QueueMusicIcon />
              </ListItemIcon>
              <ListItemText primary='Marcas' />
              {openMarca ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={openMarca} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem>
                <ListItemButton
                  selected={menuData === 'AgregarMarca'}
                  sx={{
                    '&.Mui-selected, &.Mui-selected:hover ': {
                      backgroundColor: 'primary.main',
                    },
                    backgroundColor: '#909090',
                    ':hover': { backgroundColor: 'primary.main' },
                    marginRight: 2,
                  }}
                  onClick={() => setMenuData('AgregarMarca')}
                >
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary='Agregar' />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
          {/* //CARACTERISTICAS */}
          <ListItem>
            <ListItemButton
              onClick={handleCaracteristicas}
              sx={{
                '&.Mui-selected, &.Mui-selected:hover ': {
                  backgroundColor: 'primary.main',
                },
                backgroundColor: '#898989',
                ':hover': { backgroundColor: 'primary.main' },
              }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary='Caracteristicas' />
              {openCaracteristicas ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={openCaracteristicas} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem>
                <ListItemButton
                  selected={menuData === 'AdministrarCaracteristicas'}
                  sx={{
                    '&.Mui-selected, &.Mui-selected:hover ': {
                      backgroundColor: 'primary.main',
                    },
                    backgroundColor: '#909090',
                    ':hover': { backgroundColor: 'primary.main' },
                    marginRight: 2,
                  }}
                  onClick={() => setMenuData('AdministrarCaracteristicas')}
                >
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText primary='Listar' />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider />
        <Container
          sx={{ marginTop: 'auto', marginBottom: 4, textAlign: 'center' }}
        >
          <Button
            fullWidth
            onClick={() => {
              navigate('/');
              window.location.reload();
            }}
          >
            Salir
          </Button>
        </Container>
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
        {menuData == 'Home' && <AdminHomePage />}
        {menuData == 'Agregar' && <AddProductForm />}
        {menuData == 'Listar' && <ListAllProducts />}
        {menuData == 'TodosUsuarios' && <ListAllUsuarios />}
        {menuData == 'AdministrarCaracteristicas' && <ListAllCaracteristicas />}
        {menuData == 'AgregarCategorias' && <AddCategoryForm />}
        {menuData == 'AgregarMarca' && <AddMarcaForm />}
      </Box>
    </Box>
  );
};
