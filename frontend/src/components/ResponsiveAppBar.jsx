import * as React from 'react';
import { useContext } from 'react';
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
import { Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Avatar, Divider } from '@mui/material';
import logoportalsonoroprincipal from '../assets/img/logoportalsonoroprincipal.png';
import logomobile from '../assets/img/logomobile.png';
import LogoutIcon from '@mui/icons-material/Logout';
import { GlobalUserDataContext } from '../auth/helpers/globalUserData';
import { logout } from '../auth/helpers/login';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

//const pages = ['Crear Cuenta','Iniciar Sesión'] <- se reemplaza opr pagesSites
const pagesSites = [
  { title: 'Crear Cuenta', site: '/auth/registro' },
  { title: 'Iniciar Sesión', site: '/auth/login' },
];

function ResponsiveAppBar() {
  const { isLogged, globalUserData } = useContext(GlobalUserDataContext);
  const navigate = useNavigate();

  const iniciales = [
    globalUserData?.nombre.charAt(0).toUpperCase(),
    globalUserData?.apellido.charAt(0).toUpperCase(),
  ];
  const nombre = `${globalUserData?.nombre} ${globalUserData?.apellido}`;

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
          {/* <Link
            component={RouterLink}
            to={'/'}
            style={{ textDecoration: 'none' }}
            aria-label='logo redirige a home'
          > */}
          <Divider
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              cursor: 'pointer',
            }}
          >
            <img
              src={logoportalsonoroprincipal}
              alt='portal sonoro logo'
              onClick={() => navigate('/')}
            />
          </Divider>
          {/* </Link> */}
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
          {/* <Link
            component={RouterLink}
            to={'/'}
            style={{ textDecoration: 'none' }}
          > */}
          <Divider
            sx={{
              display: { xs: 'flex', md: 'none', cursor: 'pointer' },
              mr: 1,
            }}
          >
            <img
              src={logomobile}
              alt='portal sonoro logo'
              onClick={() => navigate('/')}
            />
          </Divider>
          {/* </Link> */}
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
              display: isLogged
                ? { xs: 'none', sm: 'flex', justifyContent: 'flex-end' }
                : 'none',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Typography textAlign='center' color={'black'} paddingRight={1}>
              {nombre}
            </Typography>
            <Link
              component={RouterLink}
              to={'/auth/user'}
              style={{ textDecoration: 'none' }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 48,
                  height: 48,
                }}
              >
                {`${iniciales[0]}${iniciales[1]}`}
              </Avatar>
            </Link>
            <Button
              component={RouterLink}
              variant='contained'
              color='terceario'
              to='/administracion'
              sx={{
                my: 2,
                color: 'white',
                display: globalUserData?.rol === 'admin' ? 'block' : 'none',
                borderRadius: 70,
                fontSize: '.5rem',
                marginLeft: '0.5rem',
              }}
            >
              <AdminPanelSettingsIcon />
            </Button>
            <Button
              variant='contained'
              color='terceario'
              onClick={logout}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                borderRadius: 70,
                fontSize: '.5rem',
                marginLeft: '0.5rem',
              }}
            >
              <LogoutIcon />
            </Button>
          </Box>

          <Box
            sx={{
              padding: '1rem',
              flexGrow: 1,
              display: isLogged
                ? 'none'
                : { xs: 'none', sm: 'flex', justifyContent: 'flex-end' },
            }}
          >
            {/* <Link
              component={RouterLink}
              to={'/auth/registro'}
              style={{ textDecoration: 'none' }}
            > */}
            <Button
              variant='contained'
              color='terceario'
              size='large'
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                borderRadius: 70,
                fontSize: '.75rem',
              }}
              onClick={() => navigate('/auth/registro')}
            >
              Crear Cuenta
            </Button>
            {/* </Link> */}
            {/* </Link> */}
            {/* <Link
              component={RouterLink}
              to={'/auth/login'}
              style={{ textDecoration: 'none' }}
            > */}
            <Button
              variant='contained'
              color='terceario'
              size='large'
              sx={{
                my: 2,
                ml: 2,
                color: 'white',
                display: 'block',
                borderRadius: 70,
                fontSize: '.75rem',
              }}
              onClick={() => navigate('/auth/login')}
            >
              Iniciar Sesión
            </Button>
            {/* </Link> */}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: { xs: 'flex', sm: 'none' },
            }}
          >
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              {isLogged ? (
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 48,
                    height: 48,
                  }}
                >
                  {`${iniciales[0]}${iniciales[1]}`}
                </Avatar>
              ) : (
                <MenuIcon />
              )}
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
              {isLogged ? (
                <Box>
                  <Link
                    component={RouterLink}
                    to={'/auth/user'}
                    style={{ textDecoration: 'none' }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign='center' color={'black'}>
                        Mi Perfil
                      </Typography>
                    </MenuItem>
                  </Link>
                  {globalUserData.rol === 'admin' && (
                    <Link
                      component={RouterLink}
                      to={'/administracion'}
                      style={{ textDecoration: 'none' }}
                    >
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign='center' color={'black'}>
                          Panel Admin
                        </Typography>
                      </MenuItem>
                    </Link>
                  )}
                  <MenuItem onClick={logout}>
                    <Typography textAlign='center' color={'black'}>
                      Cerrar Sesión
                    </Typography>
                  </MenuItem>
                </Box>
              ) : (
                pagesSites.map((page, index) => (
                  <Link
                    component={RouterLink}
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
                ))
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
