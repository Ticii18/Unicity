import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/env.js';
import User from '../models/user.model.js'; // Asegúrate de importar tu modelo de usuario

export default async (req, res, next) => {
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
    req.user = user; // Esto adjunta todo el documento del usuario a req.user
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(403).json({ message: 'Token inválido' });
  }
};