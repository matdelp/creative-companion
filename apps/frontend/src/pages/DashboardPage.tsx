import React from "react";
import { AsideBar } from "../components/dashboard/AsideBar";
import { ProjectsCard } from "../components/dashboard/ProjectsCard";
import { PromptCard } from "../components/dashboard/PromptCard";
import { StatsCard } from "../components/dashboard/StatsCard";

export const Dashboard: React.FC = () => {
  return (
    <div className="bg-radial-[at_50%_75%] from-mypurple-100 via-mypink-100 to-myorange-100 w-screen h-screen flex justify-center items-center">
      <AsideBar />
      <main className="flex-1 flex flex-col p-6 overflow-hidden">
        <h1 className="text-3xl text-mytext-dark font-bold mb-4 flex-shrink-0">
          Your Dashboard
        </h1>
        <div className="grid grid-cols-2 grid-rows-2 gap-5 flex-1 min-h-0">
          <div className="row-span-2 col-span-1 bg-mybackground-light-400 rounded-xl shadow-xl p-4">
            <PromptCard />
          </div>
          <div className="row-span-1 col-span-1 bg-mybackground-light-400 rounded-xl shadow-xl p-4">
            <ProjectsCard />
          </div>
          <div className="row-span-1 col-span-1 bg-mybackground-light-400 rounded-xl shadow-xl p-4">
            <StatsCard />
          </div>
        </div>
      </main>
    </div>
  );
};
