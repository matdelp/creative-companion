import React from "react";

export const QuoteCard: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-blackText-primary text-justify text-lg px-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        ipsa ullam ratione
      </p>
      <div className="text-xs text-blackText-primary text-right w-full">
        -- from Atuhor Name
      </div>
    </div>
  );
};
