"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type CalendarProps = {
  onFilter: (range: { from: Date | undefined; to: Date | undefined }) => void;
  className?: string;
  showOutsideDays?: boolean;
};

function Calendar({
  className,
  showOutsideDays = true,
  onFilter,
}: CalendarProps) {
  const [selectedRange, setSelectedRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(true);

  const handleDayClick = (day: Date) => {
    const { from, to } = selectedRange;

    if (from && to) {
      setSelectedRange({ from: day, to: undefined });
    } else if (from) {
      if (day >= from) {
        setSelectedRange({ from, to: day });
      }
    } else {
      setSelectedRange({ from: day, to: undefined });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFilter = () => {
    onFilter(selectedRange);
    handleClose();
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const handlePreviousMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(previousMonth);
  };

  if (!isOpen) return null;

  return (
    <div>
      <div className="flex space-x-4">
        <div>
          <p>Start date</p>
          <button className="rounded-lg border border-[#ECEDF0] p-2 hover:bg-slate-200">
            {selectedRange.from
              ? selectedRange.from.toLocaleDateString()
              : "Select start date"}
          </button>
        </div>
        <div>
          <p>End date</p>
          <button className="rounded-lg border border-[#ECEDF0] p-2 hover:bg-slate-200">
            {selectedRange.to
              ? selectedRange.to.toLocaleDateString()
              : "Select end date"}
          </button>
        </div>
      </div>

      {/*<div className="flex items-center justify-between my-2">
        <button onClick={handlePreviousMonth} className="p-2">
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <span className="font-bold">
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </span>
        <button onClick={handleNextMonth} className="p-2">
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
*/}
      <DayPicker
        mode="range"
        selected={selectedRange}
        onDayClick={handleDayClick}
        showOutsideDays={showOutsideDays}
        month={currentMonth}
        onMonthChange={setCurrentMonth}
        className={cn("flex justify-center", (className = ""))}
      />

      <div className="flex space-x-2 mt-4 justify-center">
        <button
          className="rounded-lg border border-[#ECEDF0] p-2"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          className="rounded-lg border border-[#ECEDF0] p-2"
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>
    </div>
  );
}

export { Calendar };
