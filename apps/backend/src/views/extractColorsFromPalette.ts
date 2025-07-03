import { PaletteRes } from "../types/colorPalette";
import { ColorsList } from "../types/colors";

export const extractColorsFromPalette = (palette: PaletteRes): ColorsList => {
  const colors = palette.colors;
  const selectedColors = colors.map((color) => ({
    hex: color.hex.value,
    name: color.name.value,
  }));
  return selectedColors;
};
