import React from "react";

export const QuoteCard: React.FC = () => {
  return (
    <div className="w-3/4 flex flex-col gap-2 items-center bg-myblue-100 p-5 rounded-4xl">
      <p className="text-blackText-primary text-center text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        ipsa ullam ratione
      </p>
      <div className="text-sm text-blackText-primary">from Atuhor Name</div>
    </div>
  );
};
