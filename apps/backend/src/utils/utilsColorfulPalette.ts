import { DBClient } from "@creative-companion/database";
import { Color, ColorsList } from "../types/colors";

export const createColorfulPalette = async (
  prompt_id: number,
  palette: ColorsList
) => {
  const myPalette = await DBClient.palette.create({ data: { prompt_id } });
  const palette_id = myPalette.id;
  const props = await createPropsForConnection(palette, palette_id);

  await DBClient.palette_has_color.createMany({ data: props });
  return;
};

const createPropsForConnection = async (
  listOfColors: ColorsList,
  palette_id: number
) => {
  const colors = await Promise.all(
    listOfColors.map(async (color) => {
      return await transform(color, palette_id);
    })
  );
  return colors;
};

const transform = async (color: Color, palette_id: number) => {
  const dbColor = await DBClient.color.upsert({
    where: { hex: color.hex },
    update: {},
    create: color,
  });
  const color_id = dbColor.id;
  return { palette_id, color_id };
};
