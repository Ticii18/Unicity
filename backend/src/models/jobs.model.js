// Importar mongoose
import mongoose from "mongoose";

// Crear el esquema del modelo de Job
const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "El título es obligatorio."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria."],
    trim: true,
  },
  profilePhoto:{
    data: Buffer,
    contentType: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Ref a la colección de usuarios para relacionar el trabajo con un usuario
    required: [true, "El ID del usuario es obligatorio."],
  },
  createdAt: {
    type: Date,
    default: Date.now, // Fecha de creación del trabajo
  },
});

// Crear el modelo de Job a partir del esquema
const Job = mongoose.model("Job", JobSchema);

// Exportar el modelo para su uso en controladores y otros módulos
export default Job;
