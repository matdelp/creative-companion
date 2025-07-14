import express from "express";
import multer from "multer";
import { artworkController } from "../controllers/artworkController";
import { auth } from "../middleware/authenticate";

export const artworkRouter = express.Router();

artworkRouter.get("/collection", artworkController.getAllArtworks);
artworkRouter.post(
  "/submit",
  auth,
  multer().single("art"),
  artworkController.submitArtwork
);
artworkRouter.delete("/delete/:id", auth, artworkController.deleteArtwork);
artworkRouter.patch("/edit/:id", auth, artworkController.editArtwork);
artworkRouter.get("/dates", auth, artworkController.getArtworkDatesByUser);
artworkRouter.get("/amount", auth, artworkController.getArtworkDatesByUser);
artworkRouter.get("/", auth, artworkController.getArtworksByUser);
