import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { Avatar, Divider } from '@mui/material';
import logoportalsonoroprincipal from '../assets/img/logoportalsonoroprincipal.png';
import logomobile from '../assets/img/logomobile.png';
import LogoutIcon from '@mui/icons-material/Logout';

//const pages = ['Crear Cuenta','Iniciar Sesión'] <- se reemplaza opr pagesSites
const pagesSites = [{title:'Crear Cuenta', site:'/registro'},{title:'Iniciar Sesión', site:'/auth/login'}];

//iniciales debe extraerse del back, una vez logeado
const iniciales=['P','S'];
const isLogged=true;


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='sticky' color='neutralColor'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Divider sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
              <img src={logoportalsonoroprincipal} alt='' />
            </Divider>
          </Link>

          <Typography
            variant='h6'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          ></Typography>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Divider sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
              <img src={logomobile} alt='' />
            </Divider>
          </Link>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          ></Typography>
          {/*Este BOX debe mostrarse cuando el usuario está Loggeado
          Reemplaza los botones Crear Cuenta, Iniciar Sesión y Hamburguesa*/}
          <Box
            sx={{
              padding: '1rem',
              flexGrow: 1,
              display: isLogged ? 'flex' : 'none',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Avatar 
            sx={{ 
              bgcolor: 'primary.main',
              width:48,
              height:48 
              }}>
                {`${iniciales[0]}${iniciales[1]}`}
            </Avatar>
              
            <Button
                variant='contained'
                color='terceario'
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  borderRadius: 70,
                  fontSize: '.5rem',
                  marginLeft: '0.5rem',
                }}>
               <LogoutIcon/>
            </Button>
          </Box>

          <Box
            sx={{
              padding: '1rem',
              flexGrow: 1,
              display: isLogged ? 'none' : { xs: 'none', md: 'flex', justifyContent: 'flex-end' },
            }}
          >
            <Link to={'/auth/registro'} style={{ textDecoration: 'none' }}>
              <Button
                variant='contained'
                color='terceario'
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  borderRadius: 70,
                  fontSize: '.5rem',
                }}
              >
                Crear Cuenta
              </Button>
            </Link>
            {/* </Link> */}
            <Link to={'/auth/login'} style={{ textDecoration: 'none' }}>
              <Button
                variant='contained'
                color='terceario'
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  borderRadius: 70,
                  fontSize: '.5rem',
                  marginLeft: '0.5rem',
                }}
              >
                Iniciar Sesión
              </Button>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
          {/*Menu Hamburguesa*/}
            
          </Box>
          <Box sx={{ 
            flexGrow: 0,
            display: isLogged ? 'none' : { xs: 'flex', md: 'none' }
            }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pagesSites.map((page, index) => (
                <Link
                  to={page.site}
                  style={{ textDecoration: 'none' }}
                  key={index}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign='center' color={'black'}>
                      {page.title}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
