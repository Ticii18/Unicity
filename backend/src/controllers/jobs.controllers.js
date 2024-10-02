import Curriculum from '../models/jobs.model.js'; 

// Crear un nuevo curriculum
export const createCurriculum = async (req, res) => {
  try {

    console.log("userId:", req.params.userId); // Verificar que userId es correcto
    console.log("body:", req.body); // Verificar que los datos del formulario son correctos

    // Crear una nueva instancia del modelo con los datos del request
    const curriculumData = {
      userId: req.params.userId, // Almacenar el ID del creador
      name: req.body.nombre,
      profession: req.body.profesion,
      email: req.body.correo,
      phone: req.body.telefono,
      linkedin: req.body.linkedin,
      website: req.body.sitioWeb,
      experience: {
        company: req.body.empresa,
        duration: req.body.duracion,
        jobDescription: req.body.descripcionPuesto,
      },
      skills: [req.body.habilidad1, req.body.habilidad2],
      trabajosAnteriores: {
        imagen1: req.file ? req.file.path : null, // Usar la ruta de la imagen subida
      },
    };

    const curriculum = new Curriculum(curriculumData);
    const savedCurriculum = await curriculum.save();

    return res.status(201).json({
      message: 'Curriculum creado con éxito',
      curriculum: savedCurriculum,
    });
  } catch (error) {
    console.error("Error al crear curriculum:", error);
    return res.status(500).json({ message: 'Error al crear el curriculum', error });
  }
};

// Obtener un curriculum por ID
export const getCurriculumById = async (req, res) => {
  try {
    const curriculumId = req.params.id;
    const curriculum = await Curriculum.findById(curriculumId); // Asegúrate de usar el modelo Curriculum
    
    if (!curriculum) {
      return res.status(404).json({ message: 'Curriculum no encontrado' });
    }

    return res.status(200).json(curriculum);
  } catch (error) {
    console.error("Error al obtener curriculum:", error);
    return res.status(500).json({ message: 'Error al obtener el curriculum', error });
  }
};

// Obtener todos los curriculums de un usuario
export const getAllCurriculums = async (req, res) => {
  try {
    const curriculums = await Curriculum.find();
    res.json(curriculums);
  } catch (error) {
    console.error('Error al obtener los curriculums:', error);
    res.status(500).json({ message: 'Error al obtener los curriculums', error: error.message });
  }
};

// Actualizar un curriculum
export const updateCurriculum = async (req, res) => {
  try {
    const curriculumId = req.params.id;

    const curriculumData = {
      nombre: req.body.nombre,
      profesion: req.body.profesion,
      correo: req.body.correo,
      telefono: req.body.telefono,
      linkedin: req.body.linkedin,
      sitioWeb: req.body.sitioWeb,
      experiencia: {
        empresa: req.body.empresa,
        duracion: req.body.duracion,
        descripcionPuesto: req.body.descripcionPuesto,
      },
      habilidades: [req.body.habilidad1, req.body.habilidad2],
      trabajosAnteriores: {
        imagen1: req.file ? req.file.path : null, // Usar la ruta de la imagen subida
      },
    };

    const updatedCurriculum = await Curriculum.findByIdAndUpdate(curriculumId, curriculumData, {
      new: true, // Devuelve el documento actualizado
      runValidators: true, // Aplica validaciones del esquema
    });

    if (!updatedCurriculum) {
      return res.status(404).json({ message: 'Curriculum no encontrado' });
    }

    return res.status(200).json({
      message: 'Curriculum actualizado con éxito',
      curriculum: updatedCurriculum,
    });
  } catch (error) {
    console.error("Error al actualizar curriculum:", error);
    return res.status(500).json({ message: 'Error al actualizar el curriculum', error });
  }
};

// Eliminar un curriculum
export const deleteCurriculum = async (req, res) => {
  try {
    const curriculumId = req.params.curriculumId; // Obtener el curriculumId de los parámetros
    const deletedCurriculum = await Curriculum.findByIdAndDelete(curriculumId);

    if (!deletedCurriculum) {
      return res.status(404).json({ message: 'Curriculum no encontrado' });
    }

    return res.status(200).json({
      message: 'Curriculum eliminado con éxito',
      curriculum: deletedCurriculum,
    });
  } catch (error) {
    console.error("Error al eliminar curriculum:", error);
    return res.status(500).json({ message: 'Error al eliminar el curriculum', error });
  }
};
