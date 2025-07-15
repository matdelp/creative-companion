import React, { useState } from "react";
import Calendar, { type CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useGetArtworksDates } from "../../hooks/useGetArtworksDates";
import {
  isPromptCompleted,
  parseCompletedDates,
} from "../../utils/parseDatesForCalendar";
import { LongestStreak } from "./LongestStreak";
import { CompletedPromptDiagram } from "./CompletedPromptDiagram";

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
    <div className="py-4 flex gap-20 w-full items-center justify-center">
      <Calendar
        onActiveStartDateChange={handleActiveStartDateChange}
        className="!bg-mypurple-100 !rounded-xl"
        tileClassName={({ date, view }) =>
          view === "month" && isPromptCompleted(date, completedDates)
            ? "!bg-mypink-400 !rounded-full !text-black !font-bold"
            : null
        }
      />
      <div className="flex flex-col gap-2">
        <LongestStreak dates={data!} />
        <CompletedPromptDiagram />
      </div>
    </div>
  );
};
