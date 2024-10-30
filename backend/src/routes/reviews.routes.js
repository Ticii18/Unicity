// src/routes/reviews.routes.js
import { Router } from "express";
import Review from "../models/review.model.js"; // Elimina la importación incorrecta de 'aggregate'
import { createReview, getReviews } from "../controllers/reviews.controller.js";

const router = Router();

router.post("/reviews", createReview);
router.get("/reviews", getReviews);

export { router as reviewRoutes };
