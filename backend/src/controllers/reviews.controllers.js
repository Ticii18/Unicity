import Review from "../models/review.model.js"; // Asegúrate de tener un modelo de Review adecuado

// Crear una nueva reseña
export const createReview = async (req, res) => {
  try {
    const { rating, comment, userId, jobId } = req.body;

    // Validación básica
    if (!rating || !userId || !jobId) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    // Creación de la nueva reseña
    const newReview = new Review({
      rating,
      comment,
      userId,
      jobId,
    });

    const savedReview = await newReview.save();
    res
      .status(201)
      .json({ message: "Reseña creada con éxito", review: savedReview });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la reseña", error });
  }
};

// Obtener todas las reseñas
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reseñas", error });
  }
};

// Obtener una reseña por ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la reseña", error });
  }
};

// Actualizar una reseña
export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    // Actualizar la reseña
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, comment },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    res
      .status(200)
      .json({ message: "Reseña actualizada con éxito", review: updatedReview });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la reseña", error });
  }
};

// Eliminar una reseña
export const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    res.status(200).json({ message: "Reseña eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reseña", error });
  }
};
