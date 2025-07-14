import React, { useState } from "react";
import Calendar, { type CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useGetArtworksDates } from "../../hooks/useGetArtworksDates";
import {
  isPromptCompleted,
  parseCompletedDates,
} from "../../utils/parseDatesForCalendar";
import type { Value } from "react-calendar/dist/shared/types.js";
import { LongestStreak } from "./LongestStreak";

export const DashboardCalendar: React.FC = () => {
  const [today, setToday] = useState(new Date());
  const { data, isLoading, error } = useGetArtworksDates();

  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  const completedDates = parseCompletedDates(data!);

  const handleDateChange: CalendarProps["onChange"] = (value: Value) => {
    if (value instanceof Date) {
      setToday(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setToday(value[0]);
    } else {
      console.warn("Unexpected date value:", value);
    }
  };

  return (
    <div className="py-4 flex gap-4">
      <Calendar
        onChange={handleDateChange}
        value={today}
        className="!bg-myblue-100 !rounded-xl"
        tileClassName={({ date, view }) =>
          view === "month" && isPromptCompleted(date, completedDates)
            ? "!bg-green-400 !rounded-full !text-black !font-bold"
            : null
        }
      />
      <LongestStreak dates={data!} />
    </div>
  );
};
