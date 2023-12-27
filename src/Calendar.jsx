import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { addMonths, isSameMonth } from "date-fns";
import "react-day-picker/dist/style.css";

export function Calendar() {
  const today = new Date();
  const nextMonth = addMonths(new Date(), 1);
  return (
    <div className="py-10">
      <p className="flex justify-center text-lg font-bold">Schedule</p>
      <div className="flex justify-center">
        <div className="flex justify-center w-[40%] border-3 border-[#FF6969] bg-white rounded-md">
          <DayPicker
            captionLayout="dropdown-buttons"
            defaultMonth={new Date(today)}
            showOutsideDays
            fixedWeeks
            fromYear={2023}
            toYear={2024}
          />
        </div>
      </div>
    </div>
  );
}
