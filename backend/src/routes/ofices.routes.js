import { Router } from "express";
import { getAllProfessions, getProffession } from "../controllers/ofices.controller.js";

const routerProfession = Router();

routerProfession.get("/trabajos",getAllProfessions)
routerProfession.get("/trabajos/:id",getProffession)

export {routerProfession}