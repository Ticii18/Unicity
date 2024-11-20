import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import crypto from 'node:crypto';
// import { API_KEY, API_SECRET, CLOUD_NAME } from "../config/env.js";

cloudinary.config({
  cloud_name: 'dhz4cwbtx',
  api_key: 913828321711598,
  api_secret: 'MZ69MwXtXTKXoa9W6tS0uvUnWD4',
});

// Configuración para almacenar las fotos de perfil en la carpeta "Profiles"
const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    return {
      folder: 'Unicity/Profiles',
      format: 'webp',
      transformation: [
        { width: 500, height: 500, crop: 'limit' }, // Limita el tamaño de la imagen
        { quality: 'auto:good' } // Optimiza la calidad automáticamente
      ],
      public_id: `profile-${Date.now()}`, // Usa timestamp en lugar de UUID
    };
  },
});
// Configuración para almacenar las fotos de trabajos en la carpeta "Jobs"
const jobStorage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    return {
      folder: 'Unicity/Jobs', // Carpeta para fotos de trabajos
      format: 'webp',
      public_id: `${file.fieldname}-${crypto.randomUUID().toString()}`,
    };
  },
});

// Crear dos instancias de multer para subir diferentes tipos de archivos
const uploadProfile = multer({
  storage: profileStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Solo se permiten imágenes'));
    }
    cb(null, true);
  },
});
const uploadJobMulter = multer({
  storage: jobStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Solo se permiten imágenes'));
    }
    cb(null, true);
  },
});

export { uploadProfile, uploadJobMulter };
