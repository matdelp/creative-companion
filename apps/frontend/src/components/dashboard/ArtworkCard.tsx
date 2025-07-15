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
    <div className="rounded-xl shadow-lg w-xs aspect-square">
      <img
        src={art}
        alt="Artwork title"
        className="w-full object-contain rounded-t-xl"
      />
      <div className="xl:p-4 p-2 text-center">
        <h2 className="text-mytext-dark xl:text-xl text-lg font-bold xl:mb-2">
          {title}
        </h2>
        <p className="text-mytext-dark text-sm">{description}</p>
      </div>
    </div>
  );
};
