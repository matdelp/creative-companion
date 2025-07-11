import React from "react";
import { AsideBar } from "../components/dashboard/AsideBar";
import { ProjectsCard } from "../components/dashboard/ProjectsCard";

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
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold">Drawing Time Stats</h2>
            <p className="text-sm text-gray-500">
              Track your creative streaks.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold">Daily Challenge</h2>
            <p className="text-sm text-gray-500">
              Today's prompt: "Draw a mountain"
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
