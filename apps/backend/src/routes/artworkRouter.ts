import express from "express";
import multer from "multer";
import { artworkController } from "../controllers/artworkController";

export const artworkRouter = express.Router();

artworkRouter.get("/collection/:id", artworkController.getArtworksByUser);
artworkRouter.post(
  "/submit",
  multer().single("art"),
  artworkController.submitArtwork
);
artworkRouter.get("/", artworkController.getAllArtworks);
