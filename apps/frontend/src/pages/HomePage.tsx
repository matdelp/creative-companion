import React from "react";

import { UploadModal } from "../components/home/UploadModal";
import { NavBar } from "../components/NavBar";
import { PromptContainer } from "../components/home/PromptContainer";

export const HomePage: React.FC = () => {
  return (
    <div className="bg-radial-[at_50%_75%] from-mypurple-100 via-mypink-100 to-myorange-100 dark:from-mybackground-dark-100 dark:via-mybackground-dark-100 dark:to-mybackground-dark-100 w-screen h-screen flex justify-center p-2 xl:p-6">
      <div className="flex flex-col xl:w-[70%] w-[90%] bg-mybackground-light-400 dark:bg-mypink-700 rounded-xl xl:p-5 p-2 items-center">
        <NavBar />
        <h1 className="xl:text-7xl text-3xl text-myblue-400 dark:text-mytext-light text-center font-bold xl:px-8 px-2 xl:pt-0 pt-6 xl:w-4xl w-xs leading-snug">
          Create something today!
        </h1>
        <PromptContainer />
        <UploadModal />
      </div>
    </div>
  );
};
