import React, { useState } from "react";
import Calendar, { type CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useGetArtworksDates } from "../../hooks/useGetArtworksDates";
import {
  isPromptCompleted,
  parseCompletedDates,
} from "../../utils/parseDatesForCalendar";
import { LongestStreak } from "./LongestStreak";

export const DashboardCalendar: React.FC = () => {
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const { data, isLoading, error } = useGetArtworksDates(activeStartDate);

  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  const completedDates = parseCompletedDates(data!);
  const handleActiveStartDateChange: CalendarProps["onActiveStartDateChange"] =
    ({ activeStartDate }) => {
      if (activeStartDate) {
        setActiveStartDate(activeStartDate);
      }
    };

  return (
    <div className="py-4 flex gap-4">
      <Calendar
        onActiveStartDateChange={handleActiveStartDateChange}
        value={activeStartDate}
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
