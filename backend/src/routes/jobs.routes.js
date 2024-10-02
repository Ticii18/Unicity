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

// Ruta pública para obtener todos los curriculums
jobsRoutes.get("/jobs", getAllCurriculums);

// Middleware de autenticación para las rutas protegidas
jobsRoutes.use(authMiddleware);

// Ruta para crear un nuevo curriculum (protegida)
jobsRoutes.post("/add/:userId", upload.single("image"), createCurriculum);

// Ruta para obtener un curriculum específico por ID (protegida)
jobsRoutes.get("/:id", getCurriculumById);

// Ruta para actualizar un curriculum (protegida)
jobsRoutes.put("/update/:id", upload.single("image"), updateCurriculum);

// Ruta para eliminar un curriculum (protegida)
jobsRoutes.delete("/delete/:curriculumId", deleteCurriculum);

export { jobsRoutes };
