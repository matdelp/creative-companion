import React from "react";
import { AsideBar } from "../components/dashboard/AsideBar";
import { ProjectsCard } from "../components/dashboard/ProjectsCard";
import { PromptCard } from "../components/dashboard/PromptCard";
import { StatsCard } from "../components/dashboard/StatsCard";

export const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-blackText-primary ">
      <AsideBar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl text-whiteText-accent font-bold mb-4">
          Your Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectsCard />
          <PromptCard />
          <StatsCard />
        </div>
      </main>
    </div>
  );
};
