import express from "express";
import multer from "multer";
import { artworkController } from "../controllers/artworkController";
import { auth } from "../middleware/authenticate";

export const artworkRouter = express.Router();

artworkRouter.get("/collection/:id", artworkController.getArtworksByUser);
artworkRouter.post(
  "/submit",
  auth,
  multer().single("art"),
  artworkController.submitArtwork
);
artworkRouter.delete("/delete/:id", auth, artworkController.deleteArtwork);
artworkRouter.patch("/edit/:id", auth, artworkController.editArtwork);
artworkRouter.get("/", artworkController.getAllArtworks);
