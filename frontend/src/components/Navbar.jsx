import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem('token');
    handleMenuClose();
  };

  return (
    <AppBar position="static" style={{ background: '#048d45' }}>
      <Toolbar>
        {/* Logo de tu aplicación (reemplaza 'Logo' con tu propio componente o imagen) */}
        <IconButton color="inherit">
          <p /> {/* Reemplaza 'Logo' con tu propio componente o imagen */}
        </IconButton>
        
        <div style={{ flexGrow: 1 }}></div>
        
        <IconButton color="inherit" aria-controls="user-menu" onClick={handleMenuOpen}>
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
