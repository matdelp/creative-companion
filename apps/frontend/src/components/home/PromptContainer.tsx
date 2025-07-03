import React from "react";
import { ImageCard } from "./ImageCard";
import { QuoteCard } from "./QuoteCard";
import Palettecard from "./Palettecard";

const PromptContainer: React.FC = () => {
  return (
    <div className="bg-whiteText-accent rounded-4xl w-4/5 flex flex-col gap-17">
      {" "}
      <div className="gap-4 flex flex-col">
        <h1 className="text-4xl text-myblue-400 font-semibold pt-15 pl-4">
          Inspiration of the day
        </h1>
        <QuoteCard />
      </div>
      <Palettecard />
      <ImageCard />
    </div>
  );
};

export default PromptContainer;
