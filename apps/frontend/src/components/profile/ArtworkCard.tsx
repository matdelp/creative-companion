import React from "react";
type ArtworkCardProps = {
  artworks: Artwork[];
};
export type Artwork = {
  created_at: string;
  title: string;
  description: string;
  content: string;
  user_id: number;
  prompt_id: number;
};
export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artworks }) => {
  const formatDate = (date: string) => {
    return date.split("T")[0];
  };
  return (
    <div className="flex flex-wrap gap-1">
      {artworks.map((art, index) => (
        <div
          key={index}
          className="w-[32%] sm:w-[24%] md:w-[19%] aspect-square relative group overflow-hidden"
        >
          <img
            src={art.content}
            alt={`Artwork ${index}`}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white p-2 flex flex-col justify-center items-center gap-2 text-center">
            <h3 className="font-bold">{art.title}</h3>
            <p className="text-xs">{formatDate(art.created_at)}</p>
            <p className="mt-1">{art.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
