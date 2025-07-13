import React from "react";
import { DashboardCalendar } from "./DashboardCalendar";

export const StatsCard: React.FC = () => {
  return (
    <div className="bg-myblue-800 rounded-xl shadow p-4">
      <h2 className="text-whiteText-primary text-lg font-semibold">
        Drawing Stats
      </h2>
      <p className=" text-whiteText-primary">Your creative streaks:</p>
      <DashboardCalendar />
    </div>
  );
};
