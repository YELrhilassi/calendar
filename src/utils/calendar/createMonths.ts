import dayjs, { Dayjs } from "dayjs";
import { Config } from "./config";
import { NUMBER_OF_MONTHS } from "./constants";
import { getCleanDate } from "./utils";

interface Month {
  $date: Date;
  month: string;
  now: boolean;
  active: boolean;
  selected: boolean;
}

export default function createMonths(
  targetDate: Dayjs,
  slectedDates: Date[],
  { locale }: Config
) {
  const { month } = locale;
  const months = [];
  for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
    const _date = targetDate.month(i).startOf("month");

    months.push({
      $date: getCleanDate(_date).toDate(),
      month: _date.format(month),
      focused: _date.month() === targetDate.month(), // Focused = equivilant to target date of createCalendar
      now: _date.isSame(getCleanDate(dayjs()), "month"),
      selected: isSelectedMonth(slectedDates, _date),
    });
  }

  return months;
}

function isSelectedMonth(dates: Date[], d: Dayjs) {
  return dates.some((_date) => dayjs(_date).isSame(d, "month"));
}
