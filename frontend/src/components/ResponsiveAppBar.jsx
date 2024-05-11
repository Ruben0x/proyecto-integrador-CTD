<<<<<<< HEAD
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import logoportalsonoroprincipal from "../assets/img/logoportalsonoroprincipal.png";
import logomobile from "../assets/img/logomobile.png";

const pages = ["Crear Cuenta", "Iniciar Sesión"];
=======
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
import { Divider } from '@mui/material';
import logoportalsonoroprincipal from "../assets/img/logoportalsonoroprincipal.png"
import logomobile from "../assets/img/logomobile.png"

const pages = ['Crear Cuenta', 'Iniciar Sesión'];
>>>>>>> 433c1edd44d0653bd511f589b3f8756de7d7d750

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
<<<<<<< HEAD
    <AppBar position="sticky">
      <Container maxWidth="xl">
=======
    <AppBar position='sticky' color="neutralColor">
      <Container maxWidth='xl'>
>>>>>>> 433c1edd44d0653bd511f589b3f8756de7d7d750
        <Toolbar disableGutters>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Divider sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <img src={logoportalsonoroprincipal} alt="" />
            </Divider>
          </Link>

          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Divider sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
              <img src={logomobile} alt="" />
            </Divider>
          </Link>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "flex-end" },
            }}
          >
            {/* <Link to={'/login'} style={{ textDecoration: 'none' }}> */}
            <Button
              variant="contained"
              color="primary"
              sx={{ my: 2, color: "white", display: "block" }}
            >
             Crear Cuenta 
            </Button>
            {/* </Link> */}
            {/* <Link to={'/createuser'} style={{ textDecoration: 'none' }}> */}
            <Button
              variant="contained"
              color="primary"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Iniciar Sesión
            </Button>
            {/* </Link> */}
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
