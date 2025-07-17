export type ArtworkCreate = {
  title?: string | null;
  description?: string | null;
  content: string;
  user_id: number;
  prompt_id: number;
};

export type ArtworkSubmit = {
  title?: string | null;
  description?: string | null;
  content: FileList;
};

export type ArtworkUpdate = {
  title?: string | null;
  description?: string | null;
};

export type Artwork = ArtworkCreate & {
  id: number;
  created_at: Date;
};

export type ArtworkDates = {
  created_at: string;
};

export type ArtworkModification = {
  id: number;
  title?: string | null;
  description?: string | null;
};

export type ArtworkForCollection = {
  user: {
    username: string;
  };

  id: number;
  created_at: Date;
  title: string | null;
  description: string | null;
  content: string;
  user_id: number;
  prompt_id: number;
};

export type ManyArtworkCollection = ArtworkForCollection[];

export type ArtworkCollectionPaginated = {
  data: ManyArtworkCollection;
  nextPage: number;
};

export type ArtworkWithSize = ArtworkForCollection & {
  src: string;
  width: number;
  height: number;
};
