import { DBClient } from "@creative-companion/database";
import { endOfDay, startOfDay } from "date-fns";
import { DbPromptWithPalette, PromptRes } from "../types/prompt";
import { getQuote } from "../services/getQuote";
import { getPhoto } from "../services/getPhoto";
import { extractPhotoInfo } from "../views/extractPhotoInfo";
import { getColorPalette } from "../services/getColorPalette";
import { extractColorsFromPalette } from "../views/extractColorsFromPalette";
import { createColorfulPalette } from "./utilsColorfulPalette";

export const checkIfTodayHasPrompt = async () => {
  const todayPrompt = await DBClient.prompt.findFirst({
    where: {
      created_at: {
        gte: startOfDay(new Date()), // greater than or equal to
        lte: endOfDay(new Date()), // less than or equal to
      },
    },
    include: {
      palette: { include: { palette_has_color: { include: { color: true } } } },
    },
  });

  return todayPrompt;
};

export const getPromptOfTheDay = (todayPrompt: any): PromptRes => {
  return {
    quote: {
      quote: todayPrompt.quote,
      author: todayPrompt.quote_author,
      category: todayPrompt.quote_category,
    },
    photo: {
      url: todayPrompt.photo,
      author: todayPrompt.photo_author,
      promo: todayPrompt.photo_promo,
    },
    palette: todayPrompt.palette,
  };
};

export const createNewPrompt = async () => {
  const quoteRes = await getQuote();
  const photoRes = await getPhoto(quoteRes.category);
  const photo = extractPhotoInfo(photoRes);
  const paletteRes = await getColorPalette();
  const palette = extractColorsFromPalette(paletteRes);

  const dbPrompt = {
    quote: quoteRes.quote,
    quote_author: quoteRes.author,
    photo: photo.url,
    photo_author: photo.author,
    photo_promo: photo.promo,
    quote_category: quoteRes.category,
  };
  const promptRecord = await DBClient.prompt.create({ data: dbPrompt });
  await createColorfulPalette(promptRecord.id, palette);
  return {
    quote: quoteRes,
    palette: palette,
    photo: photo,
  };
};
