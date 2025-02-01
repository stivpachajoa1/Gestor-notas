// src/components/Dashboard/EventCard.jsx
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../services/api';

const EventCard = ({ event, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar el modo de edición
  const [editedEvent, setEditedEvent] = useState({ ...event }); // Estado para almacenar los datos editados

  // Función para activar el modo de edición
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Función para cancelar el modo de edición
  const handleCancel = () => {
    setIsEditing(false);
    setEditedEvent({ ...event }); // Restaurar los datos originales
  };

  // Función para guardar los cambios
  const handleSave = async () => {
    try {
      await api.put(`/events/${event._id}`, editedEvent); // Actualizar el evento en el backend
      setIsEditing(false); // Salir del modo de edición
      alert('Evento actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar el evento:', error);
      alert('Error al actualizar el evento');
    }
  };

  return (
    <Card
      sx={{
        mb: 2, // Reducido el margen inferior para hacerlo más compacto
        position: 'relative',
        borderRadius: '12px', // Bordes ligeramente más pequeños
        boxShadow: isEditing ? '0 6px 18px rgba(0, 0, 0, 0.15)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)', // Efecto de escala más sutil
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      {/* Encabezado con fondo degradado */}
      <Box
        sx={{
          background: 'linear-gradient(90deg, #673ab7, #512da8)',
          color: '#fff',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          padding: '12px', // Reducido el padding
          marginBottom: '12px', // Reducido el margen inferior
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {isEditing ? (
            <TextField
              fullWidth
              value={editedEvent.name}
              onChange={(e) => setEditedEvent({ ...editedEvent, name: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#fff',
                  },
                  '&:hover fieldset': {
                    borderColor: '#fff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#fff',
                  },
                },
                input: {
                  color: '#fff',
                  fontSize: '1rem', // Tamaño de fuente reducido
                },
              }}
            />
          ) : (
            editedEvent.name
          )}
        </Typography>
      </Box>

      <CardContent sx={{ padding: '12px' }}> {/* Padding reducido */}
        {/* Fecha y Hora */}
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" sx={{ color: '#673ab7', fontWeight: 'bold' }}>
              Fecha:{' '}
              {isEditing ? (
                <TextField
                  type="date"
                  value={editedEvent.date}
                  onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })}
                  fullWidth
                  size="small" // Campo más pequeño
                  sx={{
                    mt: 0.5,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#f5f5f5',
                      '&:hover fieldset': {
                        borderColor: '#673ab7',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#673ab7',
                      },
                    },
                  }}
                />
              ) : (
                new Date(editedEvent.date).toLocaleDateString()
              )}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" sx={{ color: '#673ab7', fontWeight: 'bold' }}>
              Hora:{' '}
              {isEditing ? (
                <TextField
                  type="time"
                  value={editedEvent.time}
                  onChange={(e) => setEditedEvent({ ...editedEvent, time: e.target.value })}
                  fullWidth
                  size="small" // Campo más pequeño
                  sx={{
                    mt: 0.5,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#f5f5f5',
                      '&:hover fieldset': {
                        borderColor: '#673ab7',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#673ab7',
                      },
                    },
                  }}
                />
              ) : (
                editedEvent.time
              )}
            </Typography>
          </Grid>
        </Grid>

        {/* Ubicación */}
        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Ubicación:</strong>{' '}
          {isEditing ? (
            <TextField
              fullWidth
              value={editedEvent.location}
              onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })}
              size="small" // Campo más pequeño
              sx={{
                mt: 0.5,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#f5f5f5',
                  '&:hover fieldset': {
                    borderColor: '#673ab7',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#673ab7',
                  },
                },
              }}
            />
          ) : (
            editedEvent.location
          )}
        </Typography>

        {/* Descripción */}
        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Descripción:</strong>{' '}
          {isEditing ? (
            <TextField
              fullWidth
              multiline
              rows={2} // Reducido el número de filas
              value={editedEvent.description}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, description: e.target.value })
              }
              size="small" // Campo más pequeño
              sx={{
                mt: 0.5,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#f5f5f5',
                  '&:hover fieldset': {
                    borderColor: '#673ab7',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#673ab7',
                  },
                },
              }}
            />
          ) : (
            editedEvent.description
          )}
        </Typography>

        {/* Botones de Acción */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '12px', // Margen superior reducido
          }}
        >
          {isEditing ? (
            <>
              <Button
                onClick={handleSave}
                variant="contained"
                size="small" // Botón más pequeño
                sx={{
                  backgroundColor: '#673ab7',
                  '&:hover': { backgroundColor: '#512da8' },
                  mr: 1,
                  borderRadius: '16px',
                  px: 2,
                }}
              >
                Guardar
              </Button>
              <Button
                onClick={handleCancel}
                variant="outlined"
                size="small" // Botón más pequeño
                sx={{
                  borderColor: '#d32f2f',
                  color: '#d32f2f',
                  '&:hover': { borderColor: '#b71c1c', color: '#b71c1c' },
                  borderRadius: '16px',
                  px: 2,
                }}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <IconButton
                onClick={handleEditClick}
                sx={{
                  color: '#673ab7',
                  '&:hover': { color: '#512da8' },
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => onDelete(event._id)}
                sx={{
                  color: '#d32f2f',
                  '&:hover': { color: '#b71c1c' },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;