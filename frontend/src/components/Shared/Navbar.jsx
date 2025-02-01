import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); // Verificar si el usuario está autenticado

  // Función para cerrar sesión
  const handleLogout = () => {
    logout(); // Elimina el token del almacenamiento local
    navigate('/'); // Redirige al usuario a la página de inicio (LandingPage)
  };

  return (
    <AppBar
      position="static"
      sx={{
        display: isAuthenticated ? 'block' : 'none', // Ocultar completamente si no está autenticado
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo o título */}
        <Typography variant="h6" sx={{ color: '#fff' }}>
          Event Manager
        </Typography>

        {/* Botón de Cerrar Sesión */}
        {isAuthenticated && (
          <Button color="inherit" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;