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
import { uploadJobMulter, uploadProfile } from "../helpers/multer.js";

const jobsRoutes = Router();

// Ruta pública para obtener todos los curriculums
jobsRoutes.get("/jobs", getAllCurriculums);

// Ruta para obtener un curriculum específico por ID (protegida)
jobsRoutes.get("/:id", getCurriculumById);

// Ruta para crear un nuevo curriculum (protegida)
jobsRoutes.post("/add/:userId",authMiddleware, uploadProfile.single("profilePhoto"), createCurriculum);

// Ruta para actualizar un curriculum (protegida)
jobsRoutes.put("/update/:id",authMiddleware, uploadProfile.single("image"), updateCurriculum);

jobsRoutes.post("/upload/:id",authMiddleware, uploadJobMulter.array("jobName",10), uploadJob);

// Ruta para eliminar un curriculum (protegida)
jobsRoutes.delete("/delete/:curriculumId",authMiddleware, deleteCurriculum);

export { jobsRoutes };
