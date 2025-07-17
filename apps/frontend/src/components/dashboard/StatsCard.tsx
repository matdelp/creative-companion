import React from "react";
import { DashboardCalendar } from "./DashboardCalendar";

export const StatsCard: React.FC = () => {
  return (
    <>
      <h2 className="text-mytext-dark dark:text-mytext-light xl:text-2xl text-lg font-semibold">
        Your Creative Journey
      </h2>
      <DashboardCalendar />
    </>
  );
};
