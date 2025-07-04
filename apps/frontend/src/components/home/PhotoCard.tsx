import React from "react";
type PhotoCardProps = {
  url: string;
  author: string;
  promo: string;
};
export const PhotoCard: React.FC<PhotoCardProps> = ({ url, author, promo }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      <div>
        <img src={url} alt="photo" className="object-contain rounded-b-4xl" />
      </div>
      <div className="text-xs text-center text-blackText-primary absolute bottom-1 right-3 bg-myblue-100/50 p-1 rounded-md">
        <p>{author}</p>

        <p>insta: {promo}</p>
      </div>
    </div>
  );
};
