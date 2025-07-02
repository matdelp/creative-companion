import { Request, Response } from "express";
import { getColorPalette } from "../services/getColorPalette";
import { extractColorsFromPalette } from "../views/extractColorsFromPalette";
import { getQuote } from "../services/getQuote";

export const promptController = {
  getPrompt: async (req: Request, res: Response) => {
    try {
      const quote = await getQuote();
      const response = await getColorPalette();
      const palette = extractColorsFromPalette(response);
      res.send({ quote: quote, palette: palette });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
