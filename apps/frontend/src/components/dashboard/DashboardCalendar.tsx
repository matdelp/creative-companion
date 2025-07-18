import React, { useMemo, useState } from "react";
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
  const [activeDate, setActiveStartDate] = useState(new Date());
  const { data, isLoading, error } = useGetArtworksDates(activeDate);

  const completedDates = useMemo(() => {
    return data ? parseCompletedDates(data) : [];
  }, [data]);

  const handleActiveStartDateChange: CalendarProps["onActiveStartDateChange"] =
    ({ activeStartDate: newDate }) => {
      if (newDate && newDate.getTime() !== activeDate.getTime()) {
        setActiveStartDate(newDate);
      }
    };

  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="xl:py-8 py-4 flex xl:flex-row flex-col gap-2 xl:gap-20 w-full items-center justify-center">
      <Calendar
        onActiveStartDateChange={handleActiveStartDateChange}
        value={activeDate}
        className="!bg-mypurple-100 dark:!bg-myblue-700 dark:!text-myblue-100 !rounded-xl !text-inherit"
        tileClassName={({ date, view }) => {
          if (view === "month" && isPromptCompleted(date, completedDates)) {
            return "!bg-mypink-400 dark:!bg-mypink-700 dark:!text-myblue-100 !rounded-full !text-black !font-bold";
          }
          if (date.toDateString() === new Date(activeDate).toDateString()) {
            return "!bg-mypurple-400 !text-white !rounded-full !font-bold";
          }
          return null;
        }}
      />
      <div className="flex flex-col gap-2">
        <LongestStreak dates={data!} />
        <CompletedPromptDiagram />
      </div>
    </div>
  );
};
