import { PaletteRes } from "@creative-companion/common";
import { ColorsList } from "@creative-companion/common";

export const extractColorsFromPalette = (palette: PaletteRes): ColorsList => {
  const colors = palette.colors;
  const selectedColors = colors.map((color) => ({
    hex: color.hex.value,
    name: color.name.value,
  }));
  return selectedColors;
};
