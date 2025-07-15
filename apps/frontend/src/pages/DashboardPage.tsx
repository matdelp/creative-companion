import React from "react";
import { AsideBar } from "../components/dashboard/AsideBar";
import { ProjectsCard } from "../components/dashboard/ProjectsCard";
import { PromptCard } from "../components/dashboard/PromptCard";
import { StatsCard } from "../components/dashboard/StatsCard";

export const Dashboard: React.FC = () => {
  return (
    <div className="bg-radial-[at_50%_75%] from-mypurple-100 via-mypink-100 to-myorange-100 w-screen h-screen flex xl:grid xl:grid-cols-[auto_1fr]">
      <AsideBar />

      <main className="flex flex-col xl:p-6 p-4 overflow-y-auto w-full">
        <h1 className="xl:text-3xl text-2xl text-mytext-dark font-bold mb-4 flex-shrink-0 pl-10 xl:pl-0">
          Your Dashboard
        </h1>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:grid-rows-2 xl:gap-5 flex-grow">
          <div className="bg-mybackground-light-400 rounded-xl shadow-xl xl:p-4 p-2 xl:row-span-2">
            <PromptCard />
          </div>
          <div className="bg-mybackground-light-400 rounded-xl shadow-xl xl:p-4 p-2">
            <ProjectsCard />
          </div>
          <div className="bg-mybackground-light-400 rounded-xl shadow-xl xl:p-4 p-2">
            <StatsCard />
          </div>
        </div>
      </main>
    </div>
  );
};
