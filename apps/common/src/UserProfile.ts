import type { Artwork } from "./Artwork";

export type UserProfile = {
  id: number;
  picture?: string;
  first_name: string;
  last_name: string;
  username: string;
  description?: string;
  artwork: Artwork[];
  projects?: number;
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

export type UserUpdate = {
  first_name?: string;
  last_name?: string;
  username?: string;
  description?: string;
};

export type UserLogin = {
  email: string;
  password: string;
};
