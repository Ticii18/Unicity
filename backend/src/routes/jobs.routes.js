import { Router } from "express";
import { 
  createCurriculum, 
  getCurriculumById, 
  getAllCurriculums, 
  updateCurriculum, 
  deleteCurriculum 
} from "../controllers/jobs.controllers.js";
import authMiddleware from "../middlewares/validar-jwt.js";
import upload from "../helpers/multer.js";

const jobsRoutes = Router();

// Todas las rutas están protegidas por authMiddleware
jobsRoutes.use(authMiddleware);

// Ruta para obtener todos los curriculums
jobsRoutes.get("/", getAllCurriculums);

// Ruta para crear un nuevo curriculum
jobsRoutes.post("/add/:userId", upload.single("image"), createCurriculum);

// Ruta para obtener un curriculum específico por ID
jobsRoutes.get("/:id", getCurriculumById);

// Ruta para actualizar un curriculum
jobsRoutes.put("/update/:id", upload.single("image"), updateCurriculum);

// Ruta para eliminar un curriculum
jobsRoutes.delete("/delete/:curriculumId", deleteCurriculum);

export { jobsRoutes };