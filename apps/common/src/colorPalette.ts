import type { Color, ColorRes } from "./colors";

export type PaletteRes = {
  mode: string;
  count: string;
  colors: ColorRes[];
  seed: ColorRes;
  image: {
    bare: string;
    named: string;
  };
  _links: {
    self: string;
    schemes: {
      [key: string]: string;
    };
  };
  _embedded: Record<string, unknown>;
};

export type PaletteDb = Color[];
