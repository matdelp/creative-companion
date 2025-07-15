import React, { useState } from "react";
type PhotoCardProps = {
  url: string;
  author: string;
  promo: string | null | undefined;
};
export const PhotoCard: React.FC<PhotoCardProps> = ({ url, author, promo }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <div className="w-sm aspect-square relative ">
        <img
          src={url}
          alt="photo"
          className="w-full h-full object-cover rounded-4xl border-8 border-mybackground-light-100"
        />

        <div className="text-xs text-center text-white drop-shadow-md absolute bottom-3 right-5 bg-black/40 p-1 rounded-md flex gap-2">
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
    </div>
  );
};
