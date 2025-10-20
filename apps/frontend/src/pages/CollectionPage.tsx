import React from "react";
import { NavBar } from "../components/NavBar";
import { ProfileButton } from "../components/collection/ProfileButton";
import { Album } from "../components/collection/Album";

export const CollectionPage: React.FC = () => {
  return (
    <div className="bg-mybackground-light-100 dark:bg-mybackground-dark-100 w-screen">
      <div className="xl:h-32 h-24 bg-gradient-to-r from-mypink-400 to-myorange-400 dark:from-myblue-700 dark:to-mypurple-700 relative xl:p-5 p-2">
        <div className="absolute top-2 left-0 pr-5 pl-2 w-full">
          <NavBar
            navStyle="w-full text-mytext-light dark:text-mytext-light flex items-center justify-between xl:px-4 xl:py-3"
            modeButtonStyle="cursor-pointer xl:text-3xl text-xl dark:text-mypink-100 dark:hover:text-mypink-400 text-mytext-light hover:text-myblue-700 text-center p-1"
            children={<ProfileButton />}
            paintbrushStyle="text-mytext-light dark:text-mypink-100 xl:w-12 xl:h-12 w-6 h-6"
            linkStyle="flex items-center xl:space-x-10 space-x-2 xl:text-2xl text-xs text-mytext-light font-bold"
            demoButtonStyle=""
            links={[
              { path: "/dashboard", name: "Dashboard" },
              { path: "/", name: "Home" },
            ]}
          />
        </div>
      </div>
      <Album />
    </div>
  );
};
