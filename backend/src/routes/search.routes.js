import { Router } from "express";
import { searchCurriculums } from '../controllers/search.controller.js';

const searchRouter = Router();

// Ruta GET para buscar curriculums
searchRouter.get('/buscar', searchCurriculums);

export default searchRouter;