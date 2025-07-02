export type ColorPaletteData = {
  mode: string;
  count: string;
  colors: ColorData[];
  seed: ColorData;
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

export type ColorData = {
  hex: {
    value: string;
    clean: string;
  };
  rgb: {
    fraction: {
      r: number;
      g: number;
      b: number;
    };
    r: number;
    g: number;
    b: number;
    value: string;
  };
  hsl: {
    fraction: {
      h: number;
      s: number;
      l: number;
    };
    h: number;
    s: number;
    l: number;
    value: string;
  };
  hsv: {
    fraction: {
      h: number;
      s: number;
      v: number;
    };
    value: string;
    h: number;
    s: number;
    v: number;
  };
  name: {
    value: string;
    closest_named_hex: string;
    exact_match_name: boolean;
    distance: number;
  };
  cmyk: {
    fraction: {
      c: number;
      m: number;
      y: number;
      k: number;
    };
    value: string;
    c: number;
    m: number;
    y: number;
    k: number;
  };
  XYZ: {
    fraction: {
      X: number;
      Y: number;
      Z: number;
    };
    value: string;
    X: number;
    Y: number;
    Z: number;
  };
  image: {
    bare: string;
    named: string;
  };
  contrast: {
    value: string;
  };
  _links: {
    self: {
      href: string;
    };
  };
  _embedded: Record<string, unknown>;
};
