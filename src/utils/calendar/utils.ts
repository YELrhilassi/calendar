import dayjs, { Dayjs } from "dayjs";

export function getCleanDate(d: Dayjs): Dayjs {
  return dayjs(d.format("YYYY/MM/DD"));
}

export function getMonthParams(date: Dayjs) {
  return {
    start: date.startOf("month").day(),
    length: date.daysInMonth(),
  };
}

export function includeDate(d: Dayjs, dates: Date[]) {
  return dates.some((_date) => d.isSame(_date, "day"));
}
