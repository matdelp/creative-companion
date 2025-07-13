import React from "react";
import { useGetPrompt } from "../../hooks/useGetPrompt";
import { InspirationCard } from "./InspirationCard";
import Palettecard from "./Palettecard";
import { PhotoCard } from "./PhotoCard";

export const PromptContainer: React.FC = () => {
  const { data, isLoading, error } = useGetPrompt();
  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="bg-whiteText-accent rounded-4xl w-4/5 max-w-3xl mx-auto flex flex-col gap-2 shadow-lg">
      <div className="p-10 flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-6 items-center w-full">
          <h1 className="text-4xl text-myblue-500 text-center font-bold pt-4 pb-2">
            Today's Inspiration
          </h1>
          <span className="text-myblue-400 font-semibold text-5xl">
            {data!.inspiration.category}
          </span>
          <InspirationCard inspiration={data!.inspiration.name} />
        </div>
        <div className="flex justify-center">
          <Palettecard colors={data!.palette} />
        </div>
      </div>
      <div className="flex justify-center">
        <PhotoCard
          url={data!.photo.url}
          author={data!.photo.author}
          promo={data!.photo.promo}
        />
      </div>
    </div>
  );
};
