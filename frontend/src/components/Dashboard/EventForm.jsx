import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Grid,
} from '@mui/material';
import api from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom'; // Importar useParams y useNavigate

const EventForm = ({ onClose }) => {
  const { id: eventId } = useParams(); // Obtener el ID del evento desde la URL
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  // Cargar datos del evento si existe un eventId
  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const response = await api.get(`/events/${eventId}`);
          const { name, date, time, location, description } = response.data;
          setName(name);
          setDate(date);
          setTime(time);
          setLocation(location);
          setDescription(description);
        } catch (error) {
          console.error('Error fetching event data:', error);
          alert('Error al cargar los datos del evento');
        }
      };
      fetchEvent();
    }
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos ni contengan solo espacios
    if (!name.trim() || !date.trim() || !time.trim() || !location.trim() || !description.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const eventData = { name, date, time, location, description };
    console.log('Datos a enviar:', eventData); // Depuración

    try {
      if (eventId) {
        console.log('Actualizando evento con ID:', eventId);
        await api.put(`/events/${eventId}`, eventData); // Actualizar evento existente
      } else {
        console.log('Creando nuevo evento');
        await api.post('/events', eventData); // Crear nuevo evento
      }
      console.log('Evento guardado exitosamente');
      alert('Evento guardado exitosamente');

      // Limpiar el estado si es un nuevo evento
      if (!eventId) {
        setName('');
        setDate('');
        setTime('');
        setLocation('');
        setDescription('');
      }

      // Redirigir al dashboard o cerrar el formulario
      onClose ? onClose() : navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        // Error con respuesta del servidor
        console.error('Error del servidor:', error.response.data);
        alert(`Error: ${error.response.data.message}`);
      } else {
        // Error de red u otro tipo de error
        console.error('Error desconocido:', error.message);
        alert('Error desconocido al guardar el evento');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 4,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: 'center',
            color: '#673ab7',
            fontWeight: 'bold',
          }}
        >
          {eventId ? 'Editar Evento' : 'Crear Evento'}
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Nombre del Evento */}
          <TextField
            label="Nombre del Evento"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* Fecha y Hora */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Fecha"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Hora"
                type="time"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          {/* Ubicación */}
          <TextField
            label="Ubicación"
            fullWidth
            margin="normal"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          {/* Descripción */}
          <TextField
            label="Descripción"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {/* Botón Guardar */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                backgroundColor: '#673ab7',
                '&:hover': {
                  backgroundColor: '#512da8',
                },
                borderRadius: '20px',
                padding: '10px',
              }}
            >
              Guardar
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default EventForm;