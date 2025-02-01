import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/auth'; // Importar el servicio de registro
import EmailIcon from '@mui/icons-material/Email'; // Ícono de correo electrónico
import LockIcon from '@mui/icons-material/Lock'; // Ícono de candado
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ícono de ojo visible
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; // Ícono de ojo oculto
// Importar la imagen PNG local
import illustration from '../../assets/images/ilustracion.png';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(email, password); // Intentar registrar al usuario
      navigate('/dashboard'); // Redirigir al dashboard
    } catch (error) {
      alert('Error al registrar usuario: ' + error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Alternar entre mostrar y ocultar contraseña
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ff4081, #673ab7)', // Fondo gradiente invertido
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Imagen decorativa */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={illustration} // Usar la imagen PNG importada
              alt="Ilustración"
              style={{
                width: '100%',
                height: '100%', // Cubre toda la altura
                objectFit: 'cover', // Ajusta la imagen al contenedor
              }}
            />
          </motion.div>
        </Grid>
        {/* Formulario */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Container maxWidth="sm">
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                  background: '#fff',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Registrarse
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Correo Electrónico"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          style={{
                            display: 'flex',
                            alignItems: 'center', // Alineación vertical
                            marginRight: 8, // Separar el ícono del texto
                          }}
                        >
                          <EmailIcon sx={{ color: 'grey.500' }} /> {/* Ícono gris */}
                        </motion.span>
                      ),
                    }}
                  />
                  <TextField
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'} // Cambiar tipo de entrada
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          style={{
                            display: 'flex',
                            alignItems: 'center', // Alineación vertical
                            marginRight: 8, // Separar el ícono del texto
                          }}
                        >
                          <LockIcon sx={{ color: 'grey.500' }} /> {/* Ícono gris */}
                        </motion.span>
                      ),
                      endAdornment: (
                        <IconButton
                          onClick={togglePasswordVisibility} // Mostrar/ocultar contraseña
                          edge="end"
                          sx={{
                            color: 'grey.500', // Color gris para el ícono
                            display: 'flex',
                            alignItems: 'center', // Alineación vertical
                          }}
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{
                      mt: 2,
                      '&:hover': {
                        backgroundColor: '#d81b60', // Cambio de color al pasar el cursor
                      },
                    }}
                  >
                    Registrarse
                  </Button>
                </form>
              </Box>
            </Container>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;