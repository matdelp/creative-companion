import { Artwork } from "./Artwork";

export type UserProfile = {
  picture?: string | null;
  first_name: string;
  last_name: string;
  username: string;
  description?: string | null;
  artwork: Artwork[];
};
