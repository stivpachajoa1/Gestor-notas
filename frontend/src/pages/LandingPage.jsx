import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import Particles from 'react-particles'; // Importa el componente principal
import { loadFull } from 'tsparticles';  // Importa la función para cargar configuraciones

const LandingPage = () => {
  // Función para inicializar las partículas
  const particlesInit = async (main) => {
    await loadFull(main); // Carga todas las características de las partículas
  };

  return (
    <>
      {/* Fondo animado */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: '#f5f5f5', // Color de fondo
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: '#673ab7', // Color de las partículas
            },
            links: {
              color: '#b3b3b3',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />

      {/* Contenido */}
      <Container
        maxWidth="md" // Ampliamos el ancho máximo del contenedor
        sx={{
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh', // Aseguramos que ocupe toda la altura de la pantalla
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -80 }} // Subimos el título más arriba al aparecer
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Título principal */}
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontFamily: "Rock Salt, serif", // Fuente Special Elite
              fontSize: '3rem', // Aumentamos el tamaño del título
              color: '#673ab7', // Color morado
              mb: 2, // Ajustamos el margen inferior
              lineHeight: 1.2, // Mejoramos el espaciado entre líneas
            }}
          >
            Eventos Majestic Purple
          </Typography>

          {/* Subtítulo */}
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              color: '#333',
              mb: 4, // Aumentamos el margen inferior para separar del botón
            }}
          >
            Gestiona tus eventos fácilmente con nuestra plataforma.
          </Typography>

          {/* Botones */}
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                href="/login"
                sx={{
                  '&:hover': {
                    backgroundColor: '#512da8', // Cambio de color al pasar el cursor
                  },
                }}
              >
                Iniciar Sesión
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                href="/register"
                sx={{
                  '&:hover': {
                    borderColor: '#d81b60', // Cambio de color del borde al pasar el cursor
                  },
                }}
              >
                Registrarse
              </Button>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </>
  );
};

export default LandingPage;