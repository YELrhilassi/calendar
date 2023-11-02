import dayjs, { Dayjs } from "dayjs";
import { NUMBER_OF_CALENDAR_DAYS } from "./constants";
import { Config } from "./config";
import { getCleanDate, getMonthParams, includeDate } from "./utils";
// import { config } from "./config";

interface Day {
  $date: Date;
  day: string;
  now: boolean;
  inCurrentMonth: boolean;
  selected: boolean;
  // disabled: boolean;
}

export interface Calendar {
  days: Day[];
  month: string;
  year: string;
}

export function createCalendar(
  targetDate: Dayjs,
  selectedDates: Date[],
  { locale }: Config
): Calendar {
  const { start } = getMonthParams(targetDate);
  const { monthDay, year, month } = locale;

  const days: Day[] = [];

  for (let i = 1; i <= NUMBER_OF_CALENDAR_DAYS; i++) {
    const _date = targetDate.date(i - start);
    days.push({
      $date: getCleanDate(_date).toDate(),
      day: _date.format(monthDay),
      now: _date.isSame(dayjs(), "day"),
      selected: includeDate(_date, selectedDates),
      inCurrentMonth: _date.month() === targetDate.month(),
    });
  }
  return {
    year: targetDate.format(year), // Need to use locale format to support languages
    month: targetDate.format(month),
    days,
  };
}
