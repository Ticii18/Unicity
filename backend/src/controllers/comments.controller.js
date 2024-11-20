import Comment from '../models/comments.model.js';

export const getComments = async (req, res) => {
  try {
    const { curriculumId } = req.params;
    const comments = await Comment.find({ curriculumId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createComment = async (req, res) => {
    try {
        console.log("Usuario autenticado:", req.user); // Depuración
        const { curriculumId, text } = req.body;
        const { _id: userId, username: userName } = req.user;

        const newComment = new Comment({
            curriculumId,
            userId,
            userName,
            text,
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error al crear comentario:", error);
        res.status(400).json({ message: error.message });
    }
};
