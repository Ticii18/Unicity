import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './db/database.js';
import { PORT } from './config/env.js';
import { authRouter } from './routes/auth.routes.js';
import { todosRouter } from './routes/todos.routes.js';

const app = express();

connectDB().then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB', err);
});

app.use(cors({
  origin: ["http://localhost:5500", "http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'session_secret_key', // Cambia esto por una clave secreta en producción
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Cambia a 'true' si usas HTTPS
}));

app.use('/auth', authRouter);
app.use('/todos', todosRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
