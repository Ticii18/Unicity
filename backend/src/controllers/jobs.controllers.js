import Curriculum from '../models/jobs.model.js'; 

// Crear un nuevo curriculum
import Profession from '../models/ofices.model.js';

export const createCurriculum = async (req, res) => {
  try {
    console.log("userId:", req.params.userId);
    console.log("body:", req.body);

    // Verificar que se haya enviado la foto de perfil
    if (!req.file) {
      return res.status(400).json({ message: "La foto de perfil es obligatoria." });
    }

    let professionId = req.body.profesion; // Mantener el ID recibido desde el formulario

    // Si el usuario elige "otros" e ingresa una nueva profesión
    if (req.body.profesion === "otros" && req.body.otherProfession) {
      const newProfession = new Profession({ profession: req.body.otherProfession });
      const savedProfession = await newProfession.save();
      professionId = savedProfession._id; // Usar el ID de la nueva profesión
    }

    // Crear el objeto con los datos del currículum
    const curriculumData = {
      userId: req.params.userId, 
      name: req.body.nombre,
      professionId, 
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

    // Guardar el currículum en la base de datos
    const newCurriculum = await Curriculum.create(curriculumData);
    res.status(201).json(newCurriculum); 

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

// Subir una foto de oficio

export const uploadJob = async (req, res) => {
  try {
    const curriculumId = req.params.id;

    // Verificar si se subieron archivos
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No se subieron imágenes." });
    }

    // Crear un array de imágenes para almacenar en la base de datos
    const images = req.files.map((file) => ({
      data: file.buffer,
      contentType: file.mimetype,
    }));

    // Actualizar el currículum agregando las imágenes
    const updatedCurriculum = await Curriculum.findByIdAndUpdate(
      curriculumId,
      { $push: { images: { $each: images } } }, // Agregar imágenes al array existente
      { new: true, runValidators: true }
    );

    if (!updatedCurriculum) {
      return res.status(404).json({ message: "Currículum no encontrado" });
    }

    res.status(200).json({
      message: "Imágenes subidas con éxito",
      curriculum: updatedCurriculum,
    });
  } catch (error) {
    console.error("Error al subir imágenes:", error);
    res.status(500).json({ message: "Error al subir las imágenes", error });
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

    // Obtener el curriculum existente
    const existingCurriculum = await Curriculum.findById(curriculumId);

    if (!existingCurriculum) {
      return res.status(404).json({ message: 'Curriculum no encontrado' });
    }
    console.log("aaaaaaa",req.file);

    // Si se subieron nuevas imágenes, agrégalas a las existentes
    if (req.file && req.file.length > 0) {
      const newImages = req.file.map((file) => ({
        data: file.buffer,
        contentType: file.mimetype,
      }));
      // Agregar las nuevas imágenes a las imágenes existentes
      curriculumData.images = [...existingCurriculum.images, ...newImages];
    }

    const updatedCurriculum = await Curriculum.findByIdAndUpdate(curriculumId, curriculumData, {
      new: true,
      runValidators: true,
    });

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
