import React from "react";
import { useGetPrompt } from "../../hooks/useGetPrompt";
import Palettecard from "../home/Palettecard";
import { useGetTodaysArt } from "../../hooks/useGetTodaysArt";
import { ArtworkCard } from "./ArtworkCard";
// import { UploadModal } from "../home/UploadModal";

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
      <h2 className="text-2xl text-mytext-dark font-semibold pb-4 overflow-hidden">
        Daily Challenge
      </h2>{" "}
      <div className="flex gap-4 w-full">
        <div className="flex w-72 h-72 aspect-square">
          <img
            src={data?.photo.url}
            alt="photo of the day"
            className="object-cover w-full h-full rounded-xl border-4 border-mybackground-light-100"
          />
        </div>
        <div className="flex flex-col grow gap-4 justify-center items-center">
          <p className="text-mytext-dark">
            Today's inspiration:{" "}
            <span className="font-bold">{data?.inspiration.category}</span>
          </p>
          <p className="text-mytext-dark text-center">
            "{data?.inspiration.name}"
          </p>
          <div className="flex justify-center bg-myptext-mytext-dark rounded-2xl p-2 ">
            <Palettecard
              colors={data!.palette}
              style={`w-10 h-10 rounded-full shadow-md`}
            />
          </div>
        </div>
      </div>
      <h2 className="text-2xl text-mytext-dark font-semibold pt-8 pb-2 text-center">
        Your Work
      </h2>
      {art ? (
        <div className="flex items-center justify-center w-full pt-2">
          <ArtworkCard
            art={art.content}
            title={art.title}
            description={art?.description}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center rounded-xl border border-mypurple-400 bg-mypurple-100 text-mytext-dark text-xl font-semibold p-6 text-center">
          <span>No masterpiece today yet...</span>{" "}
          <span>your canvas is waiting! 🎨</span>
          {/* <div className="max-w-20">
            <UploadModal />
          </div> */}
        </div>
      )}
    </>
  );
};
