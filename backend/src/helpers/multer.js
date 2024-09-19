import multer from "multer";

// Configuración de almacenamiento en memoria
const storage = multer.memoryStorage();

// Middleware de subida
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de tamaño de archivo (5MB)
  fileFilter: (req, file, cb) => {
    // Validar tipo de archivo
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Solo se permiten imágenes"));
    }
    cb(null, true);
  },
});

export default upload;