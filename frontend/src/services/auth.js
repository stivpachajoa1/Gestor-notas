import api from './api';
import { setAuthToken } from './api';

// Registrar un nuevo usuario
export const register = async (email, password) => {
  try {
    const response = await api.post('/auth/register', { email, password });
    const token = response.data.token;

    // Almacenar el token en localStorage
    localStorage.setItem('token', token);
    setAuthToken(token); // Configurar el token en Axios
  } catch (error) {
    console.error('Error al registrar usuario:', error.response?.data || error.message);

    // Mensajes específicos basados en el error del backend
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message); // Usar el mensaje del backend
    } else {
      throw new Error('Error al registrar usuario. Inténtalo de nuevo más tarde.');
    }
  }
};

// Iniciar sesión
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const token = response.data.token;

    // Almacenar el token en localStorage
    localStorage.setItem('token', token);
    setAuthToken(token); // Configurar el token en Axios
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response?.data || error.message);

    // Mensajes específicos basados en el error del backend
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message); // Usar el mensaje del backend
    } else {
      throw new Error('Error al iniciar sesión. Inténtalo de nuevo más tarde.');
    }
  }
};

// Cerrar sesión
export const logout = () => {
  localStorage.removeItem('token'); // Eliminar el token
  setAuthToken(null); // Limpiar el token en Axios
};