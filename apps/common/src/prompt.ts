export type PromptRes = {
  id: number;
  inspiration: {
    name: string;
    category: string;
  };
  palette: Color[];
  photo: {
    url: string;
    author: string;
    promo: string | null | undefined;
  };
};

type Color = {
  hex: string;
  name: string;
};

export type DbToPrompt = {
  inspiration_name: string;
  inspiration_category: string;
  photo: string;
  photo_author: string;
  photo_promo: string | null;
};
