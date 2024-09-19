// db.js

import { connect } from 'mongoose';

// URL de conexión a MongoDB. Cambia 'myDatabase' por el nombre de tu base de datos.
const mongoURI = 'mongodb://localhost/unicity';

// Función para conectar a MongoDB
const connectDB = async () => {
  try {
    // Establece la conexión con MongoDB usando mongoose
    await connect(mongoURI);
    console.log('Conexión a MongoDB establecida exitosamente');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1); // Finaliza el proceso si falla la conexión
  }
};

export default connectDB;
