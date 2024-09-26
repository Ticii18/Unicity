import connectDB from "../db/database.js";
import Job from "../models/jobs.model.js";

// Controlador para agregar un trabajo
export const addJob = async (req, res) => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Obtener el título, la descripción, y el archivo de la solicitud
    const { title, description } = req.body;
    const file = req.file;

    // Validar que el usuario esté autenticado
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado." });
    }

    // Validar que se proporcionaron todos los campos requeridos
    if (!title || !description) {
      return res.status(400).json({ message: "El título y la descripción son obligatorios." });
    }

    // Validar que el archivo esté presente y sea una imagen
    if (!file) {
      return res.status(400).json({ message: "La imagen es obligatoria." });
    }

    // Crear un nuevo trabajo usando el modelo Job
    const newJob = new Job({
      title,
      description,
      userId: req.user._id, // Asumiendo que req.user contiene el usuario autenticado
      profilePhoto: {
        data: file.buffer,
        contentType: file.mimetype,
      },
    });

    // Guardar el trabajo en la base de datos
    const savedJob = await newJob.save();

    // Enviar una respuesta con el trabajo creado
    return res.status(201).json({
      message: "Trabajo agregado exitosamente.",
      job: {
        id: savedJob._id,
        title: savedJob.title,
        description: savedJob.description,
        userId: savedJob.userId,
        profilePhoto: {
          contentType: savedJob.profilePhoto.contentType,
        },
      },
    });
  } catch (error) {
    console.error("Error al agregar el trabajo:", error);
    return res.status(500).json({ message: "Error inesperado al agregar el trabajo." });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('userId', 'name');

    const jobsWithImages = jobs.map(job => ({
      _id: job._id.toString(), // Asegúrate de convertir el ID del trabajo a string
      title: job.title,
      description: job.description,
      userId: job.userId._id.toString(), // Convertir el ID del usuario a string para evitar problemas de comparación
      userName: job.userId.name,
      profilePhoto: job.profilePhoto && job.profilePhoto.data 
        ? `data:${job.profilePhoto.contentType};base64,${job.profilePhoto.data.toString('base64')}`
        : null
    }));

    res.json(jobsWithImages);
  } catch (error) {
    console.error("Error al obtener los trabajos:", error);
    res.status(500).json({ message: "Error al obtener los trabajos" });
  }
};

// Controlador para eliminar un trabajo
// Controlador para eliminar un trabajo
export const deleteJob = async (req, res) => {
  try {
    const { userId, jobId } = req.params;

    // Verificar que el trabajo exista
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Trabajo no encontrado' });
    }

    // Verificar que el usuario autenticado sea el dueño del trabajo
    if (job.userId.toString() !== userId) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este trabajo' });
    }

    // Eliminar el trabajo usando findByIdAndDelete
    await Job.findByIdAndDelete(jobId);

    res.status(200).json({ message: 'Trabajo eliminado exitosamente' });

  } catch (error) {
    console.error('Error al eliminar el trabajo:', error);
    res.status(500).json({ message: 'Error inesperado al eliminar el trabajo' });
  }
};




