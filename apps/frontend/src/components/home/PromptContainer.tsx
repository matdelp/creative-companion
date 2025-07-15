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
    <div className="flex xl:flex-row flex-col w-full">
      <div className="flex xl:w-1/2 w-full">
        <PhotoCard
          url={data!.photo.url}
          author={data!.photo.author}
          promo={data!.photo.promo}
        />
      </div>
      <div className="flex flex-col gap-4 justify-center xl:w-1/2 w-full pb-2 ">
        <InspirationCard inspiration={data!.inspiration.name} />
        <Palettecard
          colors={data!.palette}
          style={`xl:w-20 xl:h-20 w-12 h-12 rounded-full shadow-md`}
        />
      </div>
    </div>
  );
};
