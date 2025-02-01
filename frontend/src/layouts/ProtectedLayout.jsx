// src/layouts/ProtectedLayout.jsx
import React from 'react';
import Sidebar from '../components/Shared/Sidebar';
import { Box } from '@mui/material';

const ProtectedLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3, // Padding interno
          marginLeft: '240px', // Margen igual al ancho del Sidebar
          background: '#f5f5f5', // Fondo claro para el contenido
          minHeight: '100vh', // Ocupa toda la altura de la pantalla
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ProtectedLayout;