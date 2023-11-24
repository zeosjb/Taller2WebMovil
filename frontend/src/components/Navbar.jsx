import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  /**
   * La función `handleMenuOpen` establece el elemento ancla para un menú en el objetivo actual de un
   * evento.
   */
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * La función `handleMenuClose` establece el elemento ancla a `null`.
   */
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /**
   * La función `handleLogout` cierra la sesión del usuario navegando a la página de inicio, eliminando
   * el token del almacenamiento local y cerrando el menú.
   */
  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
    handleMenuClose();
  };

  return (
    <AppBar position="static" style={{ background: "#048d45" }}>
      <Toolbar>
        <IconButton color="inherit">
          <p />
        </IconButton>

        <div style={{ flexGrow: 1 }}></div>

        <IconButton
          color="inherit"
          aria-controls="user-menu"
          onClick={handleMenuOpen}
        >
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
