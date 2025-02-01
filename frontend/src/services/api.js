import axios from 'axios';

// URL base del backend
const API_URL = 'http://localhost:5000/api'; // Ajusta según tu backend

// Crear una instancia de Axios con configuración predeterminada
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para establecer el token de autenticación
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Interceptor para manejar respuestas exitosas
api.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, simplemente la devolvemos
    return response;
  },
  (error) => {
    // Manejar errores globales
    if (error.response) {
      // Error con respuesta del servidor
      console.error('Error del servidor:', error.response.data);

      // Manejar errores específicos
      if (error.response.status === 401) {
        console.error('Error 401 detectado:', error.response.data); // Log para depuración
        alert('Tu sesión ha expirado o no tienes permisos para acceder. Por favor, inicia sesión nuevamente.');
        localStorage.removeItem('token'); // Eliminar el token caducado
        window.location.href = '/login'; // Redirigir al login
      } else {
        // Mostrar un mensaje genérico para otros errores del servidor
        alert(`Error: ${error.response.data.message || 'Ocurrió un error inesperado.'}`);
      }
    } else if (error.request) {
      // Error de red (sin respuesta del servidor)
      console.error('Error de red:', error.message);
      alert('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
    } else {
      // Otro tipo de error
      console.error('Error desconocido:', error.message);
      alert('Ocurrió un error inesperado. Por favor, intenta nuevamente.');
    }

    // Rechazar la promesa para que el error pueda ser manejado por el componente que lo llamó
    return Promise.reject(error);
  }
);

export default api;