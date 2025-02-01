import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verificar si el usuario está autenticado

  if (!isAuthenticated) {
    alert('Debes iniciar sesión para acceder a esta página.'); // Mensaje de error
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;