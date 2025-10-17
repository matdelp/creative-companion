import express from "express";
import multer from "multer";
import { artworkController } from "../controllers/artworkController";
import { auth } from "../middleware/authenticate";
import { demo } from "../middleware/demo";

export const artworkRouter = express.Router();

artworkRouter.get("/collection", artworkController.getAllArtworks);
artworkRouter.post(
  "/submit",
  multer().single("content"),
  auth,
  demo,
  artworkController.submitArtwork
);
artworkRouter.delete(
  "/delete/:id",
  auth,
  demo,
  artworkController.deleteArtwork
);
artworkRouter.patch("/edit/:id", auth, demo, artworkController.editArtwork);
artworkRouter.get("/dates", auth, artworkController.getArtworkDatesByUser);
artworkRouter.get("/amount", auth, artworkController.getArtworkDatesByUser);
artworkRouter.get("/daily", auth, artworkController.getArtworksOfTheDay);
artworkRouter.get("/collection", auth, artworkController.getAllArtworks);
artworkRouter.get("/", auth, artworkController.getArtworksByUser);
