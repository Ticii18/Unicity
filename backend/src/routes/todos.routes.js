import { Router } from "express";
import { addJob } from "../controllers/jobs.controllers.js";
import authMiddleware  from "../middlewares/validar-jwt.js"
import upload from "../helpers/multer.js";

const todosRouter = Router();

todosRouter.use(authMiddleware);

// todosRouter.get("/:userId", getTasksFromId); // Obtener todas las tareas del usuario
todosRouter.post("/add/:userId", authMiddleware,upload.single("image") ,addJob); // Crear una nueva tarea
// todosRouter.put("/put/:id",authMiddleware, updateTask); // Actualizar una tarea
// todosRouter.delete("/delete/:id",authMiddleware, deleteTask); // Eliminar una tarea

export { todosRouter };
