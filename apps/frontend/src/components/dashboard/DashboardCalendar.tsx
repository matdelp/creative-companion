import React, { useState } from "react";
import Calendar, { type CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useGetArtworksDates } from "../../hooks/useGetArtworksDates";
import { parseCompletedDates } from "../../utils/parseDatesForCalendar";
import type { Value } from "react-calendar/dist/shared/types.js";

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
  console.log({ completedDates });

  const handleDateChange: CalendarProps["onChange"] = (value: Value) => {
    // value can be Date, Date[], or null (in case of range selection)
    if (value instanceof Date) {
      setToday(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setToday(value[0]);
    } else {
      console.warn("Unexpected date value:", value);
    }
  };

  const isPromptCompleted = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return completedDates.includes(dateString);
  };

  return (
    <div className="py-4">
      <Calendar
        onChange={handleDateChange}
        value={today}
        className="!bg-myblue-100 !rounded-xl"
        tileClassName={({ date, view }) =>
          view === "month" && isPromptCompleted(date)
            ? "!bg-green-400 !rounded-full !text-black !font-bold"
            : null
        }
      />
    </div>
  );
};
