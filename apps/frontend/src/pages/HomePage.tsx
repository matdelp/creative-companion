import React from "react";

import { UploadModal } from "../components/home/UploadModal";
import { NavBar } from "../components/NavBar";
import { PromptContainer } from "../components/home/PromptContainer";
import { ProfileDropdown } from "../components/ProfileDropDown";

export const HomePage: React.FC = () => {
  return (
    <div className="bg-radial-[at_50%_75%] from-mypurple-100 via-mypink-100 to-myorange-100 dark:from-mybackground-dark-100 dark:via-mybackground-dark-100 dark:to-mybackground-dark-100 w-screen h-screen flex justify-center p-2 xl:p-6">
      <div className="flex flex-col xl:w-[70%] w-[90%] bg-mybackground-light-400 dark:bg-mypink-700 rounded-xl xl:p-5 p-2 items-center">
        <NavBar
          navStyle="w-full text-myblue-700 dark:text-mypink-100 flex items-center justify-between xl:px-4 xl:py-3"
          modeButtonStyle="cursor-pointer xl:text-3xl text-xl dark:text-mypink-100 text-mypink-400 text-center p-1"
          children={<ProfileDropdown />}
          paintbrushStyle="text-myblue-400 dark:text-mypink-100 xl:w-12 xl:h-12 w-6 h-6"
          linkStyle="flex items-center xl:space-x-10 space-x-2 xl:text-2xl text-xs text-myblue-700 dark:text-mytext-light"
          links={[
            { path: "/dashboard", name: "Dashboard" },
            { path: "/collection", name: "Collections" },
          ]}
        />
        <h1 className="xl:text-7xl text-3xl text-myblue-400 dark:text-mytext-light text-center font-bold xl:px-8 px-2 xl:pt-0 pt-6 xl:w-4xl w-xs leading-snug">
          Create something today!
        </h1>
        <PromptContainer />
        <UploadModal />
      </div>
    </div>
  );
};
