import React from "react";

export const ImageCard: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-2/3">
        <img
          src="src/assets/images/placeholder.jpg"
          alt="photo"
          className="object-fill rounded-md"
        />
      </div>
      <p className="text-sm text-blackText-primary">from: Author Name</p>
    </div>
  );
};
