import React from "react";

import { UploadModal } from "../components/home/UploadModal";
import { NavBar } from "../components/NavBar";
import { PromptContainer } from "../components/home/PromptContainer";

export const HomePage: React.FC = () => {
  return (
    <div className="bg-radial-[at_50%_75%] from-mypurple-100 via-mypink-100 to-myorange-100 w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col w-[70%] max-h-[95%] bg-mybackground-light-400 rounded-xl p-5 items-center">
        <NavBar />
        <h1 className="text-7xl text-myblue-500 text-center font-bold p-8 w-4xl">
          Create something today!
        </h1>
        <PromptContainer />
        <UploadModal />
      </div>
    </div>
  );
};
