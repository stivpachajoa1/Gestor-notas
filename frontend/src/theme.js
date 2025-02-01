import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7', // Morado profundo
    },
    secondary: {
      main: '#ff4081', // Rosa vibrante
    },
    background: {
      default: '#f5f5f5', // Fondo claro
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
    subtitle1: {
      color: '#333',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Botones sin mayúsculas forzadas
          borderRadius: 25, // Bordes redondeados
        },
      },
    },
  },
});

export default theme;