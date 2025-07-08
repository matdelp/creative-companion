import React, { useState } from "react";
type PhotoCardProps = {
  url: string;
  author: string;
  promo: string;
};
export const PhotoCard: React.FC<PhotoCardProps> = ({ url, author, promo }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      <div className="w-full aspect-square">
        <img
          src={url}
          alt="photo"
          className="w-full h-full object-cover rounded-b-4xl"
        />
      </div>
      <div className="text-xs text-center text-white drop-shadow-md absolute bottom-1 right-3 bg-black/40 p-1 rounded-md flex gap-2">
        <p>{author}</p>
        {promo && (
          <button
            className="cursor-pointer w-4 h-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img src="/images/instagram.png"></img>
          </button>
        )}
        {isOpen && <p>{promo}</p>}
      </div>
    </div>
  );
};
