import { Router } from "express";
import { 
  createCurriculum, 
  getCurriculumById, 
  getAllCurriculums, 
  updateCurriculum, 
  deleteCurriculum, 
  uploadJob
} from "../controllers/jobs.controllers.js";
import authMiddleware from "../middlewares/validar-jwt.js";
import upload from "../helpers/multer.js";

const jobsRoutes = Router();

// Ruta pública para obtener todos los curriculums
jobsRoutes.get("/jobs", getAllCurriculums);

// Ruta para obtener un curriculum específico por ID (protegida)
jobsRoutes.get("/:id", getCurriculumById);
// Ruta para crear un nuevo curriculum (protegida)
jobsRoutes.post("/add/:userId",authMiddleware, upload.single("image"), createCurriculum);

// Ruta para actualizar un curriculum (protegida)
jobsRoutes.put("/update/:id",authMiddleware, upload.single("image"), updateCurriculum);

jobsRoutes.post("/upload/:id",authMiddleware, upload.array("image",10), uploadJob);

// Ruta para eliminar un curriculum (protegida)
jobsRoutes.delete("/delete/:curriculumId",authMiddleware, deleteCurriculum);

export { jobsRoutes };
