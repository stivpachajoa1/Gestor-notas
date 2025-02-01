import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEvent(); // Llamamos a la función dentro del useEffect
  }, [id]); // Agregamos `id` como dependencia

  const handleEdit = () => {
    navigate(`/event/edit/${id}`);
  };

  if (!event) return <Typography>Cargando...</Typography>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>{event.name}</Typography>
      <Typography variant="subtitle1">Fecha: {new Date(event.date).toLocaleDateString()}</Typography>
      <Typography variant="subtitle1">Hora: {event.time}</Typography>
      <Typography variant="body2">Ubicación: {event.location}</Typography>
      <Typography variant="body2">{event.description}</Typography>
      <Button variant="contained" color="primary" onClick={handleEdit} sx={{ mt: 2 }}>
        Editar Evento
      </Button>
    </Container>
  );
};

export default EventDetailsPage;