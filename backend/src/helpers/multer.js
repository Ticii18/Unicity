import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import crypto from 'node:crypto';
import { API_KEY, API_SECRET, CLOUD_NAME } from "../config/env.js";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

// Configuración para almacenar las fotos de perfil en la carpeta "Profiles"
const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    return {
      folder: 'Unicity/Profiles', // Carpeta para fotos de perfil
      format: 'webp',
      public_id: `${file.fieldname}-${crypto.randomUUID().toString()}`,
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
  limits: { fileSize: 5 * 1024 * 1024 },
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
