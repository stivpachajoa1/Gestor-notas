const jwt = require('jwt-simple');
require('dotenv').config();

module.exports = (req, res, next) => {
  // Extraer el token del encabezado 'Authorization'
  const token = req.headers['authorization'];

  // Verificar si se proporcionó un token
  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó token' });
  }

  try {
    // Dividir el token para verificar el formato "Bearer <token>"
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      console.error('Formato de token inválido:', token);
      return res.status(401).json({ message: 'Formato de token inválido. Debe ser "Bearer <token>"' });
    }

    // Decodificar el token usando el secreto JWT
    const decoded = jwt.decode(tokenParts[1], process.env.JWT_SECRET);

    // Verificar que el token contenga un ID de usuario
    if (!decoded.id) {
      console.error('Token decodificado no contiene ID de usuario:', decoded);
      return res.status(401).json({ message: 'Token no válido o incompleto' });
    }

    // Verificar la expiración del token
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      console.error('Token expirado:', decoded);
      return res.status(401).json({ message: 'Token expirado' });
    }

    // Adjuntar el ID del usuario a la solicitud para su uso posterior
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Error al decodificar el token:', error.message);
    return res.status(401).json({ message: 'Token no válido' });
  }
};