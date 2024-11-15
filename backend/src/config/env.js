import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const SECRET_KEY = process.env.SECRET_KEY || "seed-of-backend-jwt";

export const CLOUD_NAME= process.env.CLOUDINARY_CLOUD_NAME
export const API_KEY=process.env.CLOUDINARY_API_KEY
export const API_SECRET= process.env.CLOUDINARY_API_SECRET

