import { Request, Response } from "express";
import { DBClient } from "@creative-companion/database";

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
};
