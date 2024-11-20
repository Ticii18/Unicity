import express from 'express';
import { getComments, createComment } from '../controllers/comments.controller.js';
import authMiddleware from "../middlewares/validar-jwt.js";

const routerComments = express.Router();

routerComments.get('/viewComment/:curriculumId', getComments);

routerComments.post('/commented/:id', authMiddleware, createComment);

export default routerComments;