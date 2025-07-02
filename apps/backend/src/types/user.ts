export type User = {
  id: number; //TODO change with db implementation
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  posted_artwork: number;
  tags: string[];
  artworks: string[];
};
