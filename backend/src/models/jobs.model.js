import mongoose from "mongoose";

// Crear el esquema del modelo de Curriculum
const CurriculumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio."],
    trim: true,
  },
  professionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profession',
    required: [true, "El Oficio es obligatorio"]
  }, // Referencia a oficio

  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio."],
    trim: true,
  },
  phone: {
    type: Number,
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
      required:true,
    },
    duration: {
      type: String,
      trim: true,
      required:true,
    },
    jobDescription: {
      type: String,
      trim: true,
    },
  }],
  companyData:[{
    phoneCompany:{
      type: String,
      required:true,
      trim:true,
    },
    emailCompany:{
      type: String,
      required:true,
      trim:true,
    },
    websiteCompany:{
      type: String,
      trim:true,
    }
  }],
  skills: [{
    type: String,
    trim: true,
    required:true,
  }],
  profilePhoto: {
    url: {
      type: String,
      required: true, // Asegurarse de que siempre haya una URL
    },
    public_id: {
      type: String,
      required: true, // Guardar el ID de Cloudinary para futuras gestiones
    },
  },
  images: [{
    url: {
      type: String,
      required: false,
    },
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

