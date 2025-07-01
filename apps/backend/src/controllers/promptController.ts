import { Request, Response } from "express";
import { getColorPalette } from "../services/getColorPalette";

export const promptController = {
  getPaletteColor: async (req: Request, res: Response) => {
    try {
      const palette = await getColorPalette();
      res.send(palette);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
