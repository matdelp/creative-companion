import { Request, Response } from "express";
import { getColorPalette } from "../services/getColorPalette";
import { extractColorsFromPalette } from "../views/extractColorsFromPalette";
import { getQuote } from "../services/getQuote";
import { extractCategoryFromQuote } from "../views/extractCategoryFromQuote";

export const promptController = {
  getPrompt: async (req: Request, res: Response) => {
    try {
      const quoteRes = await getQuote();
      const quoteCategory = extractCategoryFromQuote(quoteRes);
      const paletteRes = await getColorPalette();
      const palette = extractColorsFromPalette(paletteRes);
      res.send({
        quote: quoteRes,
        palette: palette,
        quoteCategory: quoteCategory,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
