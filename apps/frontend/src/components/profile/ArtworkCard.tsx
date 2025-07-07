import type { Artwork } from "@creative-companion/common";
import React from "react";
type ArtworkCardProps = {
  artworks: Artwork[];
};

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artworks }) => {
  const formatDate = (date: Date) => {
    return date.toString().split("T")[0];
  };
  return (
    <div className="flex flex-wrap gap-1">
      {artworks.map(({ content, title, created_at, description }, index) => (
        <div
          key={index}
          className="w-[32%] sm:w-[24%] md:w-[19%] aspect-square relative group overflow-hidden"
        >
          <img
            src={content}
            alt={`Artwork ${index}`}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white p-2 flex flex-col justify-center items-center gap-2 text-center">
            <h3 className="font-bold">{title}</h3>
            <p className="text-xs">{formatDate(created_at)}</p>
            <p className="mt-1">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
