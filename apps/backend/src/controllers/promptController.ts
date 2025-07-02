import { Request, Response } from "express";
import { getColorPalette } from "../services/getColorPalette";
import { extractColorsFromPalette } from "../views/extractColorsFromPalette";
import { getQuote } from "../services/getQuote";
import { extractCategoryFromQuote } from "../views/extractCategoryFromQuote";
import { getPhoto } from "../services/getPhoto";
import { extractPhotoInfo } from "../views/extractPhotoInfo";
import { Prompt } from "../types/prompt";

export const promptController = {
  getPrompt: async (req: Request, res: Response) => {
    try {
      const quoteRes = await getQuote();
      const quoteCategory = extractCategoryFromQuote(quoteRes);
      const photoRes = await getPhoto(quoteCategory);
      const photo = extractPhotoInfo(photoRes);
      const paletteRes = await getColorPalette();
      const palette = extractColorsFromPalette(paletteRes);

      const prompt: Prompt = {
        quote: quoteRes,
        palette: palette,
        photo: photo,
        artworks: [],
      };
      // TODO add a create for db recording
      res.send(prompt);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
