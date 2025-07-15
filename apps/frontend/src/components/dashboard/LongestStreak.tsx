import React from "react";
import { calculateLongestStreak } from "../../utils/parseDatesForCalendar";
import type { ArtworkDates } from "@creative-companion/common";
import { PartyPopper } from "lucide-react";

type LongestStreakProps = {
  dates: ArtworkDates[];
};
export const LongestStreak: React.FC<LongestStreakProps> = ({ dates }) => {
  const longestStreak = calculateLongestStreak(dates);
  return (
    <div className="flex h-fit items-center gap-4 xl:p-4 p-2 bg-gradient-to-r from-mypink-100 to-mypink-400 rounded-xl shadow-lg justify-center">
      <PartyPopper className="text-mytext-light dark:text-mytext-dark xl:w-10 xl:h-10 w-6 h-6" />
      <div>
        <p className="text-mytext-light dark:text-mytext-dark text-sm">
          Longest Streak
        </p>
        <p className="text-mytext-light dark:text-mytext-dark  xl:text-2xl text:xl font-bold">
          {longestStreak} days
        </p>
      </div>
    </div>
  );
};
