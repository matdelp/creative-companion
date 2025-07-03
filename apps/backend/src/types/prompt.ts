export type Prompt = {
  quote: {
    quote: string;
    author: string;
    category: string;
  };
  palette: Color[];

  photo: {
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
      small_s3: string;
    };
    author: string;
    promo: string | null | undefined;
  };
};

type Color = {
  hex: string;
  name: string;
};
