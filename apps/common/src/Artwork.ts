export type ArtworkCreate = {
  title?: string | null;
  description?: string | null;
  content: string;
  user_id: number;
  prompt_id: number;
};

export type ArtworkUpdate = {
  title?: string | null;
  description?: string | null;
};

export type Artwork = ArtworkCreate & {
  id: number;
  created_at: Date;
};
