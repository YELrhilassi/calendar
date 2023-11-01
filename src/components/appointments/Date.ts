export function newDate(year?: number, month?: number, ...rest: number[]) {
  return !year || !month ? new Date() : new Date(year, month, ...rest);
}

const NUMBER_OF_STATIC_CALENDAR_DAYS = 42;
const WEEK_DAYS = [0, 1, 2, 3, 4, 5, 6];
const DEFAULT_SELECTED_DATES: Date[] = [];
const DEFAULT_FOCUSDATE = new Date();

export default function createCalendar(config: any) {
  const offsetDate = config.offsetDate || new Date(2022, 9, -1);
  const { selectedDates } = config;
  const M = offsetDate.getMonth();
  const Y = offsetDate.getFullYear();
  const start = (offsetDate.getDay() + 7 - config.calendar.startDay) % 7;
  const lastDay = new Date(Y, M + 1, 0).getDate();
  const days = [];

  for (let i = 1; i <= NUMBER_OF_STATIC_CALENDAR_DAYS; i++) {
    const date = new Date(Y, M, i - start);
    days.push({
      $date: date,
      day: date.toLocaleDateString(config.locale.locale, { day: config.locale.day }),
      now: date.toDateString() === new Date().toDateString(),
      selected: selectedDates.some(
        (selectedDate: any) => selectedDate.toDateString() === date.toDateString()
      ),
      inCurrentMonth: date.getMonth() === M,
    });
  }

  return {
    year: offsetDate.toLocaleDateString(config.locale.locale, {
      year: config.locale.year,
    }),
    month: offsetDate.toLocaleDateString(config.locale.locale, {
      month: config.locale.monthName,
    }),
    days,
  };
}

const defaultConfig = {
  selectedDates: DEFAULT_SELECTED_DATES,
  focusDate: DEFAULT_FOCUSDATE,
  calendar: {
    mode: "static",
    offsets: [0],
    startDay: 0,
  },
  locale: {
    day: "2-digit",
    year: "numeric",
    monthName: "short",
    locale: "en-US",
  },
};

// const calendarData = createCalendar(defaultConfig);
// console.log(calendarData);
