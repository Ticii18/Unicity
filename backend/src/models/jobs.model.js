import mongoose from "mongoose";

// Crear el esquema del modelo de Curriculum
const CurriculumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio."],
    trim: true,
  },
  profession: {
    type: String,
    required: [true, "La profesión es obligatoria."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio."],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "El número de teléfono es obligatorio."],
    trim: true,
  },
  linkedin: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  experience: [{
    company: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    jobDescription: {
      type: String,
      trim: true,
    },
  }],
  skills: [{
    type: String,
    trim: true,
  }],
  profilePhoto: {
    data: Buffer,
    contentType: String,
  },
  images: [{
    data: Buffer,
    contentType: String,
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Relación con la colección de usuarios
    required: [true, "El ID del usuario es obligatorio."],
  },
  createdAt: {
    type: Date,
    default: Date.now, // Fecha de creación
  },
});

// Crear el modelo de Curriculum a partir del esquema
const Curriculum = mongoose.model("Curriculum", CurriculumSchema);

// Exportar el modelo para su uso en controladores y otros módulos
export default Curriculum;

