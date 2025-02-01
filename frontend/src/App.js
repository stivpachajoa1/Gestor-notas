// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import Navbar from './components/Shared/Navbar';
// Importar páginas
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import EventDetailsPage from './pages/EventDetailsPage';
import EventForm from './components/Dashboard/EventForm';
import ProtectedLayout from './layouts/ProtectedLayout'; // Layout para rutas protegidas
import ProtectedRoute from './components/Shared/ProtectedRoute'; // Componente para proteger rutas

const App = () => {
  const location = useLocation(); // Obtener la ubicación actual
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // Actualizar el estado del Navbar cuando cambia la ruta
    const excludedRoutes = ['/', '/login', '/register'];
    const isAuthenticated = !!localStorage.getItem('token'); // Verificar si el usuario está autenticado
    setShowNavbar(isAuthenticated && !excludedRoutes.includes(location.pathname));
  }, [location]); // Dependencia: se ejecuta cada vez que cambia la ubicación

  return (
    <ThemeProvider theme={theme}>
      {/* Mostrar Navbar solo si showNavbar es true */}
      {showNavbar && <Navbar />}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <DashboardPage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/event/create"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <EventForm />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/event/edit/:id"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <EventForm />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/event/:id"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <EventDetailsPage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

export default App;