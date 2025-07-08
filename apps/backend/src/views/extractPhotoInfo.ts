import { PhotoData } from "@creative-companion/common";

export const extractPhotoInfo = (photo: PhotoData) => {
  return {
    url: photo.urls.small, //TODO change format if another one needed in the front
    author: photo.user.name,
    promo: photo.user.instagram_username,
  };
};
