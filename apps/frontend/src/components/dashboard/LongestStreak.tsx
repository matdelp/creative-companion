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
    <div className="flex h-fit items-center gap-4 p-4 bg-gradient-to-r from-mypink-100 to-mypink-400 rounded-xl shadow-lg">
      <PartyPopper className="text-white w-10 h-10" />
      <div>
        <p className="text-white text-sm">Longest Streak</p>
        <p className="text-white text-2xl font-bold">{longestStreak} days</p>
      </div>
    </div>
  );
};
