import React from 'react';
import Register from '../components/Auth/Register';
import { Box } from '@mui/material';

const RegisterPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ocupa toda la altura de la pantalla
        margin: 0, // Elimina márgenes externos
        padding: 0, // Elimina rellenos internos
        background: 'linear-gradient(135deg, #ff4081, #673ab7)', // Fondo gradiente invertido
      }}
    >
      <Register />
    </Box>
  );
};

export default RegisterPage;