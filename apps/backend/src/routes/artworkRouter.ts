import express from "express";
import { artworkController } from "../controllers/artworkController";

export const artworkRouter = express.Router();

artworkRouter.get("/collection/:id", artworkController.getArtworksByUser);
artworkRouter.get("/", artworkController.getAllArtworks);
