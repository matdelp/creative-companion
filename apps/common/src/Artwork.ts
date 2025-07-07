export type Artwork = {
  created_at: Date;
  title?: string | null;
  description?: string | null;
  content: string;
  user_id: number;
  prompt_id: number;
};
