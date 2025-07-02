import { ColorPaletteData } from "../types/colorPaletteData";

export const extractColorsFromPalette = (palette: ColorPaletteData) => {
  const colors = palette.colors;
  const selectedColors = colors.map((color) => ({
    hex: color.hex.value,
    name: color.name.value,
  }));
  return selectedColors;
};
