const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jwt-simple');
require('dotenv').config();

// Registro de Usuario
exports.register = [
  // Validaciones
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),

  async (req, res) => {
    console.log('Datos recibidos:', req.body); // Log para depuración
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.error('Errores de validación:', errors.array()); // Log para depuración
      return res.status(400).json({ message: 'Errores de validación', errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Verificar si el usuario ya existe
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'El usuario ya está registrado' });
      }

      // Crear el nuevo usuario
      const user = new User({ email, password });
      await user.save();

      // Generar el token JWT
      const payload = {
        id: user._id,
        email: user.email, // Incluir el email en el payload
        exp: Math.floor(Date.now() / 1000) + parseInt(process.env.JWT_EXPIRATION_SECONDS || 3600), // Expiración en segundos
      };
      const token = jwt.encode(payload, process.env.JWT_SECRET);

      // Devolver el token al frontend
      res.status(201).json({ message: 'Usuario registrado exitosamente', token });
    } catch (error) {
      console.error('Error en el servidor:', error); // Log para depuración
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
];

// Inicio de Sesión
exports.login = [
  // Validaciones
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Errores de validación', errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Buscar el usuario por email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }

      // Verificar la contraseña
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }

      // Generar el token JWT
      const payload = {
        id: user._id,
        email: user.email, // Incluir el email en el payload
        exp: Math.floor(Date.now() / 1000) + parseInt(process.env.JWT_EXPIRATION_SECONDS || 3600), // Expiración en segundos
      };
      const token = jwt.encode(payload, process.env.JWT_SECRET);

      // Devolver el token al frontend
      res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
      console.error('Error en el servidor:', error); // Log para depuración
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
];