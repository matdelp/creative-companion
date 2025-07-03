import React from "react";

export const ImageCard: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      <div>
        <img
          src="src/assets/images/placeholder.jpg"
          alt="photo"
          className="object-contain rounded-b-4xl"
        />
      </div>
      <p className="text-xs text-blackText-primary absolute bottom-1 right-3 bg-myblue-100/50 p-1 rounded-md">
        from: Author Name
      </p>
    </div>
  );
};
