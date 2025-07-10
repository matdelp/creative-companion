import { Artwork } from "./Artwork";

export type UserProfile = {
  picture?: string;
  first_name: string;
  last_name: string;
  username: string;
  description?: string;
  artwork: Artwork[];
};

export type UserInfo = {
  first_name: string;
  last_name: string;
  username: string;
  description?: string;
  picture?: string;
};

export type UserPhoto = {
  picture: string;
};
