// src/components/Dashboard/EventList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import EventCard from './EventCard';
import EventFilter from './EventFilter'; // Importar el componente de filtro
import api from '../../services/api'; // Ruta corregida
import { List, Divider, Box, Typography } from '@mui/material';
import NoEventsImage from '../../assets/images/no-events.png'; // Importar la imagen para "no hay eventos"

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Función para cargar eventos con filtros opcionales
  const fetchEvents = async (startDate = '', endDate = '') => {
    try {
      const response = await api.get('/events', {
        params: { startDate, endDate }, // Enviar fechas como parámetros
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Error al cargar los eventos');
    }
  };

  // Cargar eventos al montar el componente
  useEffect(() => {
    fetchEvents(); // Cargar eventos sin filtro inicialmente
  }, []);

  // Función para eliminar un evento
  const handleDelete = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      fetchEvents(); // Actualizar la lista de eventos después de eliminar
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error al eliminar el evento');
    }
  };

  // Función para editar un evento
  const handleEdit = (id) => {
    navigate(`/event/edit/${id}`); // Redirigir al formulario de edición
  };

  // Manejar el filtrado de eventos
  const handleFilter = (startDate, endDate) => {
    fetchEvents(startDate, endDate); // Cargar eventos con el filtro aplicado
  };

  return (
    <>
      {/* Componente de Filtro */}
      <EventFilter onFilter={handleFilter} />

      {/* Lista de Eventos o Mensaje de "No hay eventos" */}
      {events.length > 0 ? (
        <List>
          {events.map((event) => (
            <React.Fragment key={event._id}>
              <EventCard
                event={event}
                onDelete={handleDelete} // Pasar la función de eliminación
                onEdit={handleEdit} // Pasar la función de edición
              />
              <Divider />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Centrar horizontalmente
            justifyContent: 'center', // Centrar verticalmente
            minHeight: '60vh', // Altura mínima para ocupar más espacio
            marginTop: 8, // Aumentar el margen superior para bajar la imagen
          }}
        >
          {/* Imagen para "No hay eventos" */}
          <img
            src={NoEventsImage} // Ruta de la imagen
            alt="No hay eventos disponibles"
            style={{
              width: '350px', // Hacer la imagen más grande
              height: 'auto',
              marginBottom: '32px', // Espacio mayor entre la imagen y el texto
            }}
          />
          {/* Texto debajo de la imagen */}
          <Typography
            variant="h5" // Usar una fuente más grande y destacada
            color="textSecondary"
            sx={{
              fontWeight: 'bold', // Hacer el texto en negrita
              textAlign: 'center', // Centrar el texto
              textTransform: 'uppercase', // Convertir el texto a mayúsculas
              letterSpacing: '1.5px', // Espaciado mayor entre letras
            }}
          >
            no event dispobles
          </Typography>
        </Box>
      )}
    </>
  );
};

export default EventList;