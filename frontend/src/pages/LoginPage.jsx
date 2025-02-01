import React from 'react';
import Login from '../components/Auth/Login';
import { Box } from '@mui/material';

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ocupa toda la altura de la pantalla
        margin: 0, // Elimina márgenes externos
        padding: 0, // Elimina rellenos internos
        background: 'linear-gradient(135deg, #673ab7, #ff4081)', // Fondo gradiente
      }}
    >
      <Login />
    </Box>
  );
};

export default LoginPage;