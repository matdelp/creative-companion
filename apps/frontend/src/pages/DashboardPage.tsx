import React from "react";
import { AsideBar } from "../components/dashboard/AsideBar";
import { ProjectsCard } from "../components/dashboard/ProjectsCard";
import { PromptCard } from "../components/dashboard/PromptCard";
import { StatsCard } from "../components/dashboard/StatsCard";
import { ThemeToggleButton } from "../components/ThemeToggleButton";

export const Dashboard: React.FC = () => {
  return (
    <div className="bg-radial-[at_50%_75%] from-mypurple-100 via-mypink-100 to-myorange-100 dark:from-mybackground-dark-100 dark:via-mybackground-dark-100 dark:to-mybackground-dark-100 w-screen h-screen flex xl:grid xl:grid-cols-[auto_1fr]">
      <AsideBar />

      <main className="flex flex-col w-full h-screen xl:h-screen overflow-hidden xl:p-6 p-4">
        <div className="flex items-center py-3 xl:py-1 gap-4 xl:mb-2 flex-shrink-0">
          <h1 className="xl:text-3xl text-2xl text-mytext-dark dark:text-mytext-light font-bold flex-shrink-0 pl-10 xl:pl-0">
            Your inspiration Station
          </h1>
          <ThemeToggleButton modeButtonStyle="cursor-pointer xl:text-3xl text-xl dark:text-myblue-100 text-myorange-700 hover:text-myorange-400 dark:hover:text-myblue-700 text-center p-1" />
        </div>

        <div
          className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:grid-rows-2 xl:gap-5 flex-grow overflow-auto"
          style={{ minHeight: 0 }}
        >
          <div className="bg-mybackground-light-400 dark:bg-mypink-700 rounded-xl shadow-xl xl:p-4 p-2 xl:row-span-2">
            <PromptCard />
          </div>
          <div className="bg-mybackground-light-400 dark:bg-mypink-700 rounded-xl shadow-xl xl:p-4 p-2">
            <ProjectsCard />
          </div>
          <div className="bg-mybackground-light-400 dark:bg-mypink-700 rounded-xl shadow-xl xl:p-4 p-2">
            <StatsCard />
          </div>
        </div>
      </main>
    </div>
  );
};
