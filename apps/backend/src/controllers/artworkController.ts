import {
  Artwork,
  ArtworkCreate,
  ArtworkUpdate,
} from "@creative-companion/common";
import { DBClient } from "@creative-companion/database";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authenticate";
import { supabase } from "../services/supabaseClient/client";
import { getTodayPrompt } from "../utils/utilsLimitPrompt";

export const artworkController = {
  getArtworksByUser: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId;
    const user = await DBClient.user.findUnique({
      where: { id: Number(userId) },
      include: { artwork: true },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user.artwork);
  },

  getArtworkDatesByUser: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId;
    const user = await DBClient.user.findUnique({
      where: { id: Number(userId) },
      include: {
        artwork: {
          select: { created_at: true },
        },
      },
    });
    console.log(user);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(user.artwork);
  },

  getAllArtworks: async (req: Request, res: Response) => {
    // TODO later on : Add some queries to search through the artwork and make it user friendly
    // const { prompt, tag, date, user, colors } = req.query;
    const artworks = await DBClient.artwork.findMany({ where: {} });
    res.status(200).json(artworks);
  },

  submitArtwork: async (
    req: AuthenticatedRequest,
    res: Response<Artwork | { error: string } | { message: string }>
  ) => {
    if (!req.body) {
      res.status(400).json({ error: "Body required" });
      return;
    }
    const userId = req.userId;
    const user = await DBClient.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      res.status(404).json({ error: "Please login to upload your art" });
      return;
    }
    const todayPrompt = await getTodayPrompt();
    if (!todayPrompt) {
      res.status(404).json({ error: "Prompt not found" });
      return;
    }
    const { title, description } = req.body;
    const submittedFile = req.file!;

    const { originalname, mimetype } = submittedFile;
    const { data, error } = await supabase.storage
      .from("artwork")
      .upload(Date.now() + "_" + originalname, submittedFile.buffer, {
        upsert: false,
        contentType: mimetype,
      });
    if (error) {
      res.status(500).json({ error: "Error uploading file" });
      return;
    }
    const url = supabase.storage.from("artwork").getPublicUrl(data.path)
      .data.publicUrl;

    const newArt: ArtworkCreate = {
      title: title,
      description: description,
      content: url,
      user_id: user.id,
      prompt_id: todayPrompt.id,
    };

    const userArt = await DBClient.artwork.findUnique({
      where: {
        user_id_prompt_id: { user_id: user.id, prompt_id: todayPrompt.id },
      },
    });
    if (userArt) {
      await DBClient.artwork.update({
        where: { id: userArt.id },
        data: { title: title, description: description, content: url },
      });
      res.json({
        message: `Art updated successfully`,
      });
      return;
    }
    await DBClient.artwork.create({ data: newArt });

    res.json({
      message: `New art created successfully`,
    });
  },

  editArtwork: async (
    req: AuthenticatedRequest,
    res: Response<ArtworkUpdate | { error: string } | { message: string }>
  ) => {
    if (!req.body) {
      res.status(400).json({ error: "Body required" });
      return;
    }
    const { title, description } = req.body;
    // TODO: add validation schema (JOI?)
    const artworkId = Number(req.params.id);
    if (!artworkId) {
      res.status(404).json({ error: "Art not found" });
      return;
    }

    const artwork = await DBClient.artwork.findUnique({
      where: { id: artworkId },
    });
    if (!artwork) {
      res.status(404).json({ error: "Art not found" });
      return;
    }

    const userId = req.userId;
    if (userId !== artwork.user_id) {
      res.status(400).json({ error: "Wrong user" });
      return;
    }

    const updatedArt: ArtworkUpdate = {
      title,
      description,
    };
    await DBClient.artwork.update({
      where: { id: artworkId },
      data: updatedArt,
    });
    res.json({
      message: `Art updated successfully`,
    });
  },

  deleteArtwork: async (req: AuthenticatedRequest, res: Response) => {
    const artworkId = Number(req.params.id);
    const artwork = await DBClient.artwork.findUnique({
      where: { id: artworkId },
    });
    if (!artwork) throw new Error("404 Art not found");

    const userId = req.userId;
    if (userId !== artwork.user_id) {
      res.status(400).json({ error: "Wrong user" });
      return;
    }
    await DBClient.artwork.delete({ where: { id: artworkId } });
    res.json({
      message: `Art deleted successfully`,
    });
  },
};
