import type { PromptRes } from "@creative-companion/common";
import React, { useEffect, useState } from "react";
import { InspirationCard } from "./InspirationCard";
import Palettecard from "./Palettecard";
import { PhotoCard } from "./PhotoCard";

const PromptContainer: React.FC = () => {
  const [prompt, setPrompt] = useState<PromptRes | null>(null);

  useEffect(() => {
    fetch("/api/prompt/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: PromptRes) => {
        setPrompt(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);
  if (prompt == null) return <div>Loading</div>;

  return (
    <div className="bg-whiteText-accent rounded-4xl w-4/5 max-w-3xl mx-auto flex flex-col gap-2 shadow-lg">
      <div className="p-10 flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-6 items-center w-full">
          <h1 className="text-4xl text-myblue-500 text-center font-bold pt-4 pb-2">
            Today's Inspiration
          </h1>
          <span className="text-myblue-400 font-semibold text-5xl">
            {prompt.inspiration.category}
          </span>
          <InspirationCard inspiration={prompt.inspiration.name} />
        </div>
        <div className="flex justify-center">
          <Palettecard colors={prompt.palette} />
        </div>
      </div>
      <div className="flex justify-center">
        <PhotoCard
          url={prompt.photo.url}
          author={prompt.photo.author}
          promo={prompt.photo.promo}
        />
      </div>
    </div>
  );
};

export default PromptContainer;
