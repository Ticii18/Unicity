import { Router } from "express";
import { getAllProfessions, getProffessionById } from "../controllers/ofices.controller.js";

const routerProfession = Router();

routerProfession.get("/trabajos",getAllProfessions)
routerProfession.get("/trabajos/:id",getProffessionById)


export {routerProfession}