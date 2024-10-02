import connectDB from "../db/database.js";
import User from '../models/user.model.js';
import bcrypt from "bcrypt";
import generarJwt from "../helpers/generar-jwt.js";

// Controlador para registrarse
export const signUpCtrl = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validar que todos los campos estén presentes
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Conectar a la base de datos
    await connectDB();

    // Verificar si el usuario o correo ya existe
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: "El usuario o correo ya está registrado" });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario en la base de datos
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();



    return res.status(201).json({
      message: "Registro exitoso",
      userId: newUser.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
};

// Controlador para iniciar sesión
export const signInCtrl = async (req, res) => {
  const { username, password } = req.body;

  try {
    await connectDB();
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Generar el JWT
    const token = await generarJwt(user.id); // Asegúrate de que esto esté funcionando

    // Guardar el token en la sesión y la cookie
    req.session.token = token;
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, // Cambia a true si usas HTTPS
      maxAge: 3600000, // 1 hora
    });

    return res.json({
      message: "Inicio de sesión exitoso",
      userId: user.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
};


// Controlador para cerrar sesión
export const signOutCtrl = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }

      res.clearCookie("authToken");
      return res.json({ message: "Cierre de sesión exitoso" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
};

// Controlador para validar sesión
export const validateSessionCtrl = async (req, res) => {
  try {
    // Asegúrate de que req.user contenga la información del usuario autenticado
    if (!req.user) {
      return res.status(403).json({ message: 'No autorizado' });
    }
    
    res.json({
      userId: req.user._id, // Asumiendo que _id es el identificador único
      username: req.user.username
    });
  } catch (error) {
    console.error('Error al validar la sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};