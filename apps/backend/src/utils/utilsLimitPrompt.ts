import { DBClient } from "@creative-companion/database";
import { endOfDay, startOfDay } from "date-fns";
import { getColorPalette } from "../services/getColorPalette";
import { getPhoto } from "../services/getPhoto";
import { getInspiration } from "../services/getPrompt";
import { PromptRes } from "@creative-companion/common";
import { extractColorsFromPalette } from "../views/extractColorsFromPalette";
import { extractPhotoInfo } from "../views/extractPhotoInfo";
import { createColorfulPalette } from "./utilsColorfulPalette";

type FetchedPrompt = Awaited<ReturnType<typeof getTodayPrompt>>;

export const getTodayPrompt = async () => {
  const now = new Date();
  const todayPrompt = await DBClient.prompt.findFirst({
    where: {
      created_at: {
        gte: startOfDay(now), // greater than or equal to
        lte: endOfDay(now), // less than or equal to
      },
    },
    include: {
      palette: {
        include: { palette_has_color: { include: { color: true } } },
      },
      inspiration: true,
    },
  });

  return todayPrompt;
};

export const parseFetchedPrompt = (
  todayPrompt: NonNullable<FetchedPrompt>
): PromptRes => {
  return {
    inspiration: {
      name: todayPrompt.inspiration.name,
      category: todayPrompt.inspiration.category,
    },
    photo: {
      url: todayPrompt.photo,
      author: todayPrompt.photo_author,
      promo: todayPrompt.photo_promo ?? null,
    },
    palette:
      todayPrompt.palette?.palette_has_color.map((entry) => ({
        hex: entry.color.hex,
        name: entry.color.name,
      })) ?? [],
  };
};

export const createNewPrompt = async () => {
  const inspirationRes = await getInspiration();
  const photoRes = await getPhoto(inspirationRes.category);
  const photo = extractPhotoInfo(photoRes);
  const paletteRes = await getColorPalette();
  const palette = extractColorsFromPalette(paletteRes);

  const dbPrompt = {
    photo: photo.url,
    photo_author: photo.author,
    photo_promo: photo.promo,
    inspiration_id: inspirationRes.id,
  };
  const promptRecord = await DBClient.prompt.create({ data: dbPrompt });
  await createColorfulPalette(promptRecord.id, palette);
  return {
    inspiration: inspirationRes,
    palette: palette,
    photo: photo,
  };
};
