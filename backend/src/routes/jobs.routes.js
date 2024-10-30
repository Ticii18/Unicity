import { Router } from "express";
import {
  createCurriculum,
  getCurriculumById,
  getAllCurriculums,
  updateCurriculum,
  deleteCurriculum,
} from "../controllers/jobs.controllers.js";
import authMiddleware from "../middlewares/validar-jwt.js";
import upload from "../helpers/multer.js";
import Review from "../models/review.model.js"; // Asegúrate de que el modelo de Review esté correcto

const jobsRoutes = Router();

// Ruta pública para obtener todos los curriculums
jobsRoutes.get("/jobs", getAllCurriculums);

// Ruta para obtener un curriculum específico por ID (protegida)
jobsRoutes.get("/:id", getCurriculumById);

// Ruta para crear un nuevo curriculum (protegida)
jobsRoutes.post(
  "/add/:userId",
  authMiddleware,
  upload.single("image"),
  createCurriculum
);

// Ruta para crear una nueva reseña
jobsRoutes.post("/reviews", async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    // Crear y guardar la nueva reseña
    const newReview = new Review({ rating, comment });
    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la reseña" });
  }
});

// Ruta para actualizar un curriculum (protegida)
jobsRoutes.put(
  "/update/:id",
  authMiddleware,
  upload.single("image"),
  updateCurriculum
);

// Ruta para eliminar un curriculum (protegida)
jobsRoutes.delete("/delete/:curriculumId", authMiddleware, deleteCurriculum);

export { jobsRoutes };
