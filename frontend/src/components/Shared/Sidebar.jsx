// src/components/Shared/Sidebar.jsx
import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: '240px',
        height: '100vh',
        background: '#212121', // Fondo oscuro para el Sidebar
        color: '#fff',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      {/* Encabezado con un color gris oscuro */}
      <Box
        sx={{
          height: '64px', // Altura fija para el encabezado
          backgroundColor: '#212121', // Color gris oscuro igual al fondo del sidebar
        }}
      />
      {/* Lista de opciones */}
      <List>
        {/* Dashboard */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/dashboard')}>
            <ListItemIcon>
              <HomeIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        {/* Crear Evento */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/event/create')}>
            <ListItemIcon>
              <EventIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Crear Evento" />
          </ListItemButton>
        </ListItem>
        {/* Separador */}
        <Divider sx={{ borderColor: '#424242' }} />
      </List>
    </Box>
  );
};

export default Sidebar;