import React from "react";
import { ImageCard } from "./ImageCard";
import Palettecard from "./Palettecard";
import { QuoteCard } from "./QuoteCard";
import axios from "axios";

const PromptContainer: React.FC = () => {
  const apiCall = () => {
    axios.get("http://localhost:5000").then((data) => {
      //this console.log will be in our frontend console
      console.log(data);
    });
  };

  return (
    <div className="bg-whiteText-accent rounded-4xl w-4/5 flex flex-col gap-17">
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
