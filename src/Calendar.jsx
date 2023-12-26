import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { addMonths, isSameMonth } from "date-fns";
import "react-day-picker/dist/style.css";

export function Calendar() {
  const today = new Date();
  const nextMonth = addMonths(new Date(), 1);
  return (
    <DayPicker
      captionLayout="dropdown-buttons"
      defaultMonth={new Date(today)}
      showOutsideDays
      fixedWeeks
      fromYear={2023}
      toYear={2024}
    />
  );
}
