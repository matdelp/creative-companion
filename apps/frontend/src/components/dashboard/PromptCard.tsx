import React from "react";
import { useGetPrompt } from "../../hooks/useGetPrompt";
import Palettecard from "../home/Palettecard";

export const PromptCard = () => {
  const { data, isLoading, error } = useGetPrompt();
  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="bg-myblue-800 rounded-xl shadow p-4">
      <h2 className="text-lg text-whiteText-primary font-semibold pb-4">
        Daily Challenge
      </h2>{" "}
      <div className="flex gap-4">
        <div className="flex w-30 h-30 justify-center ">
          <img
            src={data?.photo.url}
            alt="photo of the day"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-whiteText-primary">
            Today's inspiration:{" "}
            <span className="font-bold">{data?.inspiration.category}</span>
          </p>
          <p className="text-whiteText-primary text-center">
            "{data?.inspiration.name}"
          </p>
          <div className="flex justify-center ">
            <Palettecard
              colors={data!.palette}
              style={`w-10 h-10 rounded-full shadow-md`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
