import { Request, Response } from "express";
import { getColorPalette } from "../services/getColorPalette";
import { getPhoto } from "../services/getPhoto";
import { getQuote } from "../services/getQuote";
import { Prompt } from "../types/prompt";
import { extractColorsFromPalette } from "../views/extractColorsFromPalette";
import { extractPhotoInfo } from "../views/extractPhotoInfo";
import { DBClient } from "@creative-companion/database";
import { createColorfulPalette } from "../utils/utilsColorfulPalette";

export const promptController = {
  getPrompt: async (req: Request, res: Response) => {
    try {
      const quoteRes = await getQuote();
      const photoRes = await getPhoto(quoteRes.category);
      const photo = extractPhotoInfo(photoRes);
      const paletteRes = await getColorPalette();
      const palette = extractColorsFromPalette(paletteRes);

      const dbPrompt = {
        quote: quoteRes.quote,
        quote_author: quoteRes.author,
        photo: photo.urls.full,
        photo_author: photo.author,
        photo_promo: photo.promo,
        quote_category: quoteRes.category,
      };

      const promptRecord = await DBClient.prompt.create({ data: dbPrompt });
      await createColorfulPalette(promptRecord.id, palette);

      const promptRes: Prompt = {
        quote: quoteRes,
        palette: palette,
        photo: photo,
      };
      res.send(promptRes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
