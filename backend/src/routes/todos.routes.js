import { Router } from "express";
import { addJob, getAllJobs, deleteJob } from "../controllers/jobs.controllers.js";
import authMiddleware from "../middlewares/validar-jwt.js";
import upload from "../helpers/multer.js";

const todosRouter = Router();

// Ruta pública para obtener todos los trabajos
todosRouter.get("/jobs", getAllJobs);

// Rutas protegidas que requieren autenticación
todosRouter.post("/add/:userId", authMiddleware, upload.single("image"), addJob);
// todosRouter.put("/put/:id", authMiddleware, updateTask);
todosRouter.delete("/delete/:userId/:jobId", authMiddleware, deleteJob);


export { todosRouter };