import React from "react";
import { AsideBar } from "../components/dashboard/AsideBar";
import { ProjectsCard } from "../components/dashboard/ProjectsCard";
import { PromptCard } from "../components/dashboard/PromptCard";
import { StatsCard } from "../components/dashboard/StatsCard";

export const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-myorange-200 w-screen">
      <AsideBar />
      <main className="flex-1 flex flex-col p-6 overflow-hidden">
        <h1 className="text-2xl text-blackText-primary font-bold mb-4 flex-shrink-0">
          Your Dashboard
        </h1>
        <div className="grid grid-cols-2 grid-rows-2 gap-5 flex-1 min-h-0">
          <div className="row-span-2 col-span-1 bg-mypink-100 rounded-xl shadow-2xl p-4 overflow-auto min-h-0">
            <PromptCard />
          </div>
          <div className="row-span-1 col-span-1 bg-mypink-100 rounded-xl shadow-2xl p-4 overflow-auto min-h-0">
            <ProjectsCard />
          </div>
          <div className="row-span-1 col-span-1 bg-mypink-100 rounded-xl shadow-2xl p-4 overflow-auto min-h-0">
            <StatsCard />
          </div>
        </div>
      </main>
    </div>
  );
};
