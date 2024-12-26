"use client";

import { FC, useState, useMemo } from "react";

import { getYear, getMonth, format } from "date-fns";

import { createDaysForCalendarView } from "@/utilities/dateHelpers";
import { twMerge } from "tailwind-merge";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Calendar: FC = () => {
  const today = new Date();
  const initialYear = getYear(today);
  const initialMonth = getMonth(today);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);

  const daysForCalendarView = useMemo(
    () => createDaysForCalendarView(selectedYear, selectedMonth),
    [selectedYear, selectedMonth]
  );

  // Months and day of the week numbers start from 0 on javascript Date
  // months 0 to 11
  // days of the week 0 to 6
  const goToPrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedYear((prev) => prev - 1);
      setSelectedMonth(11);
    } else setSelectedMonth((prev) => prev - 1);
  };

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedYear((prev) => prev + 1);
      setSelectedMonth(0);
    } else setSelectedMonth((prev) => prev + 1);
  };

  const onPrevClick = () => {
    goToPrevMonth();
  };

  const onNextClick = () => {
    goToNextMonth();
  };

  return (
    <div className="max-w-4xl m-auto">
      <div className="w-full flex justify-between mb-4">
        <button onClick={onPrevClick}>Prev</button>
        <span className="m-auto w-fit flex justify-between text-indigo-700 font-bold">
          {format(new Date(selectedYear, selectedMonth), "MMMM yyyy")}
        </span>
        <button onClick={onNextClick}>Next</button>
      </div>

      <div className="p-2 gap-1 rounded-md w-full grid grid-cols-7 sm:gap-2 bg-purple-100 border border-purple-300 sm:rounded-lg sm:p-4 overflow-hidden">
        {WEEKDAYS.map((weekday, index) => {
          return (
            <div
              key={"weekday-" + index}
              className="text-center text-xs sm:text-sm font-bold text-purple-50 bg-purple-500 rounded-lg px-1 py-0.5 sm:px-2 sm:py-1"
            >
              {weekday}
            </div>
          );
        })}

        {daysForCalendarView.map((day, index) => {
          return (
            <div
              key={"day-box-" + index}
              className={twMerge(
                "w-full aspect-square flex justify-center items-center border border-purple-300 rounded-lg text-purple-300 text-xs sm:text-sm",
                day.isCurrentMonth && "text-purple-900 border-purple-500",
                day.isWeekend && "bg-purple-200 border-purple-500",
                day.isToday && "border-none bg-purple-700 text-purple-50"
              )}
            >
              {day.dayOfMonth}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
