import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/env.js';
import User from '../models/user.model.js';

export default async (req, res, next) => {
  // Permitir acceso público a la ruta "/jobs" en método GET
  if (req.path === "/jobs" && req.method === "GET") {
    return next(); // Permitir el acceso sin autenticación
  }

  const token = req.cookies.authToken || req.session.token;

  if (!token) {
    console.log('Token no proporcionado');
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    req.user = user; // Adjuntar el documento del usuario en req.user
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(403).json({ message: 'Token inválido' });
  }
};
