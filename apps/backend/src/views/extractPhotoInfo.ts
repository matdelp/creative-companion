import { PhotoData } from "../types/photoData";

export const extractPhotoInfo = (photo: PhotoData) => {
  return {
    url: photo.urls.regular, //TODO change format if another one needed in the front
    author: photo.user.name,
    promo: photo.user.instagram_username,
  };
};
