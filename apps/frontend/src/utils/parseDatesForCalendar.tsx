import type { ArtworkDates } from "@creative-companion/common";
import { differenceInCalendarDays } from "date-fns";

export const parseCompletedDates = (data: ArtworkDates[]) => {
  return data.map((item) => {
    const date = new Date(item.created_at);
    return date.toISOString().split("T")[0];
  });
};

export const isPromptCompleted = (date: Date, completedDates: string[]) => {
  const dateString = date.toISOString().split("T")[0];
  return completedDates.includes(dateString);
};

export const calculateLongestStreak = (dates: ArtworkDates[]): number => {
  if (dates.length === 0) return 0;

  const sortedDates = dates
    .map((date) => new Date(date.created_at))
    .sort((a, b) => a.getTime() - b.getTime());

  let longest = 1;
  let currentStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const diff = differenceInCalendarDays(sortedDates[i], sortedDates[i - 1]);
    if (diff === 1) {
      currentStreak += 1;
      longest = Math.max(longest, currentStreak);
    } else if (diff > 1) {
      currentStreak = 1;
    }
  }

  return longest;
};
