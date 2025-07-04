import { PaletteDb } from "./colorPalette";

export type PromptRes = {
  quote: {
    quote: string;
    author: string;
    category: string;
  };
  palette: Color[];
  photo: {
    url: string;
    author: string;
    promo: string | null | undefined;
  };
};

type Color = {
  hex: string;
  name: string;
};

export type DbToPrompt = {
  quote: string;
  quote_author: string;
  photo: string;
  photo_author: string;
  photo_promo: string | null;
  quote_category: string;
};
