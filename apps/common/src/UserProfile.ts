import { Artwork } from "./Artwork";

export type UserProfile = {
  picture?: string;
  first_name: string;
  last_name: string;
  username: string;
  description?: string;
  artwork: Artwork[];
};
