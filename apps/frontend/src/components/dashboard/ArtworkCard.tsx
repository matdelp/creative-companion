import React from "react";
type ArtworkCardProps = {
  art: string;
  title?: string | null;
  description?: string | null;
};
export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  art,
  title = "Add a title to your art",
  description = "Add a description to your art",
}) => {
  return (
    <div className="bg-myblue-800 rounded-xl shadow-lg overflow-hidden max-w-lg">
      <img
        src={art}
        alt="Artwork title"
        className="w-full h-auto object-contain"
      />
      <div className="p-4 text-center">
        <h2 className="text-whiteText-accent text-xl font-bold mb-2">
          {title}
        </h2>
        <p className="text-whiteText-primary text-sm">{description}</p>
      </div>
    </div>
  );
};
