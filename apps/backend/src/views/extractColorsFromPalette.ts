import { ColorsList } from "../types/colorfulPalette";
import { ColorPaletteData } from "../types/colorPaletteData";

export const extractColorsFromPalette = (
  palette: ColorPaletteData
): ColorsList => {
  const colors = palette.colors;
  const selectedColors = colors.map((color) => ({
    hex: color.hex.value,
    name: color.name.value,
  }));
  return selectedColors;
};
