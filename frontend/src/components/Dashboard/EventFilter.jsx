// src/components/Dashboard/EventFilter.jsx
import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';

const EventFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    // Llamar a la función de filtrado pasada como prop
    onFilter(startDate, endDate);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Fecha de Inicio */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Fecha de Inicio"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px', // Bordes redondeados
              },
            }}
          />
        </Grid>

        {/* Fecha de Fin */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Fecha de Fin"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px', // Bordes redondeados
              },
            }}
          />
        </Grid>

        {/* Botón Filtrar */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilter}
            fullWidth
            sx={{
              backgroundColor: '#673ab7', // Color morado profundo
              '&:hover': {
                backgroundColor: '#512da8', // Color morado oscuro al pasar el mouse
              },
              borderRadius: '20px', // Bordes redondeados
              padding: '10px',
              textTransform: 'none', // Mantener texto en minúsculas
              fontSize: '1rem', // Tamaño de fuente más grande
            }}
          >
            Filtrar Eventos
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventFilter;