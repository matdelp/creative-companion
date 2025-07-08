import { Request, Response } from "express";
import { DBClient } from "@creative-companion/database";
import { supabase } from "../services/supabaseClient/client";
import { AuthenticatedRequest } from "../middleware/authenticate";
import { Artwork } from "@creative-companion/common";
import { getTodayPrompt } from "../utils/utilsLimitPrompt";

export const artworkController = {
  getArtworksByUser: async (req: Request, res: Response) => {
    const userId = req.params.id;
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
      .upload(originalname, submittedFile.buffer, {
        upsert: false,
        contentType: mimetype,
      });
    if (error) {
      res.json({ error: "Error uploading file" });
      return;
    }
    const url = supabase.storage.from("artwork").getPublicUrl(data.path)
      .data.publicUrl;

    const newArt: Artwork = {
      title: title,
      description: description,
      content: url,
      user_id: user.id,
      prompt_id: todayPrompt.id,
    };
    const dbnewArt = await DBClient.artwork.create({ data: newArt });
    console.log(JSON.stringify(dbnewArt, null, 2));

    res.json({
      message: `New art created successfully`,
    });
  },
};
