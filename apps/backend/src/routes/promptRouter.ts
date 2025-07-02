import express from "express";
import { promptController } from "../controllers/promptController";

export const promptRouter = express.Router();

promptRouter.get("/", promptController.getPrompt);
