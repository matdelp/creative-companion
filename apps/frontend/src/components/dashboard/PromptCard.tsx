import React from "react";
import { useGetPrompt } from "../../hooks/useGetPrompt";
import Palettecard from "../home/Palettecard";
import { useGetTodaysArt } from "../../hooks/useGetTodaysArt";
import { ArtworkCard } from "./ArtworkCard";

export const PromptCard: React.FC = () => {
  const { data, isLoading, error } = useGetPrompt();
  const {
    data: art,
    isLoading: isLoadingArt,
    error: errorArt,
  } = useGetTodaysArt();
  console.log(art);

  if (isLoading || isLoadingArt) {
    return <div>loading</div>;
  }
  if (error || errorArt) {
    return <div>error</div>;
  }

  return (
    <>
      <h2 className="text-lg text-mypink-800 font-semibold pb-4">
        Daily Challenge
      </h2>{" "}
      <div className="flex gap-4">
        <div className="flex w-36 h-36 justify-center ">
          <img
            src={data?.photo.url}
            alt="photo of the day"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-mypink-800">
            Today's inspiration:{" "}
            <span className="font-bold">{data?.inspiration.category}</span>
          </p>
          <p className="text-mypink-800 text-center">
            "{data?.inspiration.name}"
          </p>
          <div className="flex justify-center bg-myptext-mypink-800 rounded-2xl p-2 ">
            <Palettecard
              colors={data!.palette}
              style={`w-10 h-10 rounded-full shadow-md`}
            />
          </div>
        </div>
      </div>
      <h2 className="text-lg text-mypink-800 font-semibold py-4">Your Work</h2>
      {art ? (
        <ArtworkCard
          art={art.content}
          title={art.title}
          description={art?.description}
        />
      ) : (
        <div className="flex items-center justify-center rounded-xl border bg-mypink-400 text-whiteText-accent text-lg font-semibold p-6 text-center">
          No masterpiece today yet — your canvas is waiting! 🎨
        </div>
      )}
    </>
  );
};
