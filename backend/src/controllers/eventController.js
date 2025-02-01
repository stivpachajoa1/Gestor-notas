const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Event = require('../models/Event');

// Crear un nuevo evento
exports.createEvent = [
  // Validaciones
  body('name').notEmpty().withMessage('El nombre del evento es obligatorio'),
  body('date').isISO8601().withMessage('La fecha debe estar en formato ISO8601'),
  body('time').notEmpty().withMessage('La hora es obligatoria'),
  body('location').notEmpty().withMessage('La ubicación es obligatoria'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, date, time, location, description } = req.body;

    try {
      // Obtener el ID del usuario autenticado desde el middleware de autenticación
      const userId = req.userId;
      if (!userId) {
        console.error('Error: No se encontró userId en la solicitud');
        return res.status(401).json({ message: 'No autorizado' });
      }

      // Crear el evento con el userId
      const event = new Event({ name, date, time, location, description, userId });
      await event.save();

      res.status(201).json(event);
    } catch (error) {
      console.error('Error al crear el evento:', error.message, error.stack);

      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Datos inválidos', details: error.message });
      }

      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
];

// Obtener eventos paginados (filtrados por el usuario autenticado y opcionalmente por fecha)
exports.getEvents = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Obtener los parámetros de fecha del query string
  const { startDate, endDate } = req.query;

  try {
    // Obtener el ID del usuario autenticado desde el middleware de autenticación
    const userId = req.userId;

    // Construir el filtro base
    let filter = { userId };

    // Agregar filtros de fecha si se proporcionan
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate), // Mayor o igual que la fecha de inicio
        $lte: new Date(endDate),  // Menor o igual que la fecha de fin
      };
    } else if (startDate) {
      filter.date = { $gte: new Date(startDate) }; // Solo fecha de inicio
    } else if (endDate) {
      filter.date = { $lte: new Date(endDate) }; // Solo fecha de fin
    }

    // Obtener los eventos filtrados
    const events = await Event.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(events);
  } catch (error) {
    console.error('Error al obtener eventos:', error.message, error.stack);
    res.status(500).json({ message: 'Error al obtener eventos' });
  }
};

// Actualizar un evento existente
exports.updateEvent = [
  // Validaciones
  body('name').notEmpty().withMessage('El nombre del evento es obligatorio'),
  body('date').isISO8601().withMessage('La fecha debe estar en formato ISO8601'),
  body('time').notEmpty().withMessage('La hora es obligatoria'),
  body('location').notEmpty().withMessage('La ubicación es obligatoria'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, date, time, location, description } = req.body;

    try {
      // Verificar si el ID es válido
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID de evento inválido' });
      }

      // Buscar el evento por ID
      const event = await Event.findById(id);
      if (!event) {
        return res.status(404).json({ message: 'Evento no encontrado' });
      }

      // Verificar que el evento pertenezca al usuario autenticado
      if (event.userId.toString() !== req.userId) {
        return res.status(403).json({ message: 'No tienes permiso para actualizar este evento' });
      }

      // Actualizar el evento
      const updatedEvent = await Event.findByIdAndUpdate(
        id,
        { name, date, time, location, description },
        { new: true }
      );

      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error('Error al actualizar el evento:', error.message, error.stack);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
];

// Eliminar un evento existente
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de evento inválido' });
    }

    // Buscar el evento por ID
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    // Verificar que el evento pertenezca al usuario autenticado
    if (event.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este evento' });
    }

    // Eliminar el evento
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: 'Evento eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el evento:', error.message, error.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};