import { Request, Response } from "express";
import { artworks, users } from "../dummyData";

export const artworkController = {
  getArtworksByUser: async (req: Request, res: Response) => {
    const userId = req.params.id;
    // const user = await Model.findById(userId);
    const user = users.find((user) => user.id === Number(userId));
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    // const artworks = await UserModel.find({user.artworks}).populate({id});
    const artworks = user.artworks;

    if (artworks.length < 1) {
      res.status(404).json({ error: "User has no atrwork yet" });
      return;
    } //TODO change to artwork? when db fetching
    res.status(200).json(artworks);
  },
  getAllArtworks: async (req: Request, res: Response) => {
    const { prompt, tag, date, user, colors } = req.query;
    //Add some queries to search through the artwork and make it user friendly
    res.status(200).json(artworks);
  },
};
