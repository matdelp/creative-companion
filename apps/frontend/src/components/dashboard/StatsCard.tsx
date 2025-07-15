import React from "react";
import { DashboardCalendar } from "./DashboardCalendar";

export const StatsCard: React.FC = () => {
  return (
    <>
      <h2 className="text-text-mytext-dark dark:text-mytext-light text-lg font-semibold">
        Drawing Stats
      </h2>
      <DashboardCalendar />
    </>
  );
};
