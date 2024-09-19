function authMiddleware(req, res, next) {
    // Suponiendo que el ID del usuario está en req.user
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado.' });
    }
    next();
  }
  
  // Usar el middleware en las rutas
  app.use('/tasks', authMiddleware);