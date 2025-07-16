import React from "react";
import { useGetPrompt } from "../../hooks/useGetPrompt";
import { useGetTodaysArt } from "../../hooks/useGetTodaysArt";
import Palettecard from "../home/Palettecard";
import { ArtworkCard } from "./ArtworkCard";
// import { UploadModal } from "../home/UploadModal";

export const PromptCard: React.FC = () => {
  const { data, isLoading, error } = useGetPrompt();
  const {
    data: art,
    isLoading: isLoadingArt,
    error: errorArt,
  } = useGetTodaysArt();

  if (isLoading || isLoadingArt) {
    return <div>loading</div>;
  }
  if (error || errorArt) {
    return <div>error</div>;
  }

  return (
    <>
      <h2 className="xl:text-2xl text-xl text-mytext-dark dark:text-mytext-light font-semibold xl:pb-4 pb-2 overflow-hidden text-center">
        Daily Challenge
      </h2>{" "}
      <div className="flex xl:flex-row flex-col xl:gap-4 gap-2 w-full items-center">
        <div className="flex xl:w-72 w-56 aspect-square">
          <img
            src={data?.photo.url}
            alt="photo of the day"
            className="object-cover w-full h-full rounded-xl border-4 border-mybackground-light-100 dark:border-mybackground-dark-100"
          />
        </div>
        <div className="flex flex-col grow gap-4 justify-center items-center">
          <p className="text-mytext-dark dark:text-mytext-light">
            Today's inspiration:{" "}
            <span className="font-bold text-mypink-400">
              {data?.inspiration.category}
            </span>
          </p>
          <p className="text-mytext-dark dark:text-mytext-light text-center">
            "{data?.inspiration.name}"
          </p>
          <div className="flex justify-center bg-myptext-mytext-dark dark:text-mytext-light rounded-2xl p-2 ">
            <Palettecard
              colors={data!.palette}
              style={`w-10 h-10 rounded-full shadow-md`}
            />
          </div>
        </div>
      </div>
      <h2 className="xl:text-2xl text-xl text-mytext-dark dark:text-mytext-light font-semibold pt-8 pb-2 text-center">
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
        <div className="flex flex-col xl:gap-4 gap-1 items-center justify-center rounded-xl border border-mypurple-400 dark:border-myblue-400 bg-mypurple-100 dark:bg-myblue-700 text-mytext-dark dark:text-mytext-light xl:text-xl font-semibold xl:p-6 p-2 text-center">
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
