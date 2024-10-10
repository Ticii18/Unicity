import Curriculum from '../models/jobs.model.js'; 

// Crear un nuevo curriculum
export const createCurriculum = async (req, res) => {
  try {
    console.log("userId:", req.params.userId); // Verificar que userId es correcto
    console.log("body:", req.body); // Verificar que los datos del formulario son correctos

    // Verificar que se haya enviado la foto de perfil
    if (!req.file) {
      return res.status(400).json({ message: "La foto de perfil es obligatoria." });
    }

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
      profilePhoto: {
        data: req.file.buffer,
        contentType: req.file.mimetype, 
      },
    };

    // Guardar curriculumData en la base de datos
    const newCurriculum = await Curriculum.create(curriculumData);
    res.status(201).json(newCurriculum); // Responder con el currículum creado

  } catch (error) {
    console.error("Error al crear el currículum:", error);
    res.status(500).json({ message: "Error al crear el currículum" });
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

    const curriculumsWithBase64Image = curriculums.map(curriculum => {
      const curriculumObject = curriculum.toObject();

      // Convertir imagen en base64 si existe
      if (curriculumObject.profilePhoto && curriculumObject.profilePhoto.data) {
        curriculumObject.profilePhoto.data = curriculumObject.profilePhoto.data.toString('base64');
      }

      return curriculumObject; 
    });

    res.json(curriculumsWithBase64Image);
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
    };

    // Si se subió una nueva imagen, añadirla al curriculumData
    if (req.file) {
      curriculumData.profilePhoto = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

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
