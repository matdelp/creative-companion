import { PhotoData } from "../types/photoData";

export const extractPhotoInfo = (photo: PhotoData) => {
  return {
    urls: photo.urls,
    author: photo.user.name,
    promo: photo.user.instagram_username,
  };
};
