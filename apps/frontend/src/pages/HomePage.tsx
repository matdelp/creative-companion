import React from "react";

import { UploadModal } from "../components/home/UploadModal";
import { NavBar } from "../components/NavBar";
import { PromptContainer } from "../components/home/PromptContainer";

export const HomePage: React.FC = () => {
  return (
    <div className="bg-radial-[at_50%_75%] from-mypurple-100 via-mypink-100 to-myorange-100 w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col xl:w-[70%] w-[90%] max-h-[95%] bg-mybackground-light-400 rounded-xl xl:p-5 p-2 items-center">
        <NavBar />
        <h1 className="xl:text-7xl text-3xl text-myblue-500 text-center font-bold xl:px-8 px-2 xl:pt-2 pt-6 xl:w-4xl w-2xs xl:leading-relaxed leading-snug">
          Create something today!
        </h1>
        <PromptContainer />
        <UploadModal />
      </div>
    </div>
  );
};
