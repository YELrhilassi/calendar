// /*
//  * It is used for static 🗓 to cover all possible month start and end date combination
//  * One month could take 6 rows by 7 days
//  * 27 28 29 30 31 01 02
//  * 03 04 05 06 07 08 09
//  * 10 11 12 13 14 15 16
//  * 17 18 19 20 21 22 23
//  * 24 25 26 27 28 29 30
//  * 31 01 02 03 04 05 06
//  */
const NUMBER_OF_STATIC_CALENDAR_DAYS = 42;

//Weekdays array template, each index mimics its position
const WEEK_DAYS = [0, 1, 2, 3, 4, 5, 6] as const;
const NUMBER_OF_MONTHS = 12;
const MINUTES_IN_THE_DAY = 60 * 24; // 1440 :)

// Number of years by default to mimic number of month
// It will be easy to reuse same layout for years picker
const DECADE_NUMBER_OF_YEARS = 12;
const DEFAULT_YEARS_STEP = 10;
const DEFAULT_CALENDAR_CONFIG: {
  mode: "static" | "fluid";
  offsets: number[];
  startDay: (typeof WEEK_DAYS)[number];
} = {
  mode: "static",
  offsets: [0],
  startDay: 0,
};

const DEFAULT_YEARS_CONFIG: {
  numberOfYears: number;
  mode: "decade" | "fluid" | "exact";
  step: number;
} = {
  mode: "decade",
  numberOfYears: DECADE_NUMBER_OF_YEARS,
  step: DEFAULT_YEARS_STEP,
};

const DEFAULT_DATES_CONFIG: DatesTypes = {
  mode: "single",
  toggle: false,
  selectSameDate: false,
};

const DEFAULT_TIME_CONFIG = {
  interval: 30,
  useLocales: false,
};

const DEFAULT_LOCALE_CONFIG: LocalTypes = {
  locale: "en-GB",
  day: "2-digit",
  year: "numeric",
  weekday: "short",
  monthName: "long",
  hour: "2-digit",
  minute: "2-digit",
  hour12: undefined,
  second: undefined,
};

const DEFAULT_SELECTED_DATES: Date[] = [];
const DEFAULT_ONDATESCHANGE: (d: Date[]) => void = (d: Date[]) => {};
const DEFAULT_ONOFFSETCHANGE: (d: Date) => void = (d: Date) => {};
const DEFAULT_OFFEST_DATE = new Date();
const DEFAULT_FOCUSDATE = new Date();

const SET_FOCUS_DATE_ACTION = "SET_FOCUS_DATE";
const SET_OFFSET_DATE_ACTION = "SET_OFFSET_DATE";
const SET_RANGE_END_ACTION = "SET_RANGE_END";
const SET_YEAR_ACTION = "SET_YEAR";
//
//
//
// ------------------------------------------------------ //
const defaultConfig: ConfigType = {
  selectedDates: DEFAULT_SELECTED_DATES,
  onDatesChange: DEFAULT_ONDATESCHANGE,
  onOffsetChange: DEFAULT_ONOFFSETCHANGE,
  focusDate: DEFAULT_FOCUSDATE,
  calendar: {
    ...DEFAULT_CALENDAR_CONFIG,
  },
  years: { ...DEFAULT_YEARS_CONFIG },
  dates: {
    ...DEFAULT_DATES_CONFIG,
  },
  locale: {
    ...DEFAULT_LOCALE_CONFIG,
  },
  time: {
    ...DEFAULT_TIME_CONFIG,
  },
  exclude: {},
};

//
//
//
// ------------------------------------------------ //

type LocalTypes = {
  locale: Intl.LocalesArgument;
  options?: Intl.DateTimeFormatOptions;
  day: Intl.DateTimeFormatOptions["day"];
  year: Intl.DateTimeFormatOptions["year"];
  monthName: Intl.DateTimeFormatOptions["month"];
  weekday: Intl.DateTimeFormatOptions["weekday"];
  hour: Intl.DateTimeFormatOptions["hour"];
  minute: Intl.DateTimeFormatOptions["minute"];
  second?: Intl.DateTimeFormatOptions["second"];
  hour12?: Intl.DateTimeFormatOptions["hour12"];
};

type DatesTypes = {
  mode: "single" | "multiple" | "range";
  minDate?: Date;
  maxDate?: Date;
  toggle?: boolean;
  limit?: number;
  selectSameDate?: boolean;
  exclude?: {
    day?: (typeof WEEK_DAYS)[number][];
    date?: Date[];
  };
};

type CalendarType = {
  mode?: "static" | "fluid";
  offsets: number[];
  startDay: (typeof WEEK_DAYS)[number];
};

type ConfigType = {
  selectedDates: Date[];
  onDatesChange(d: Date[]): void;
  onOffsetChange?(d: Date): void;
  offsetDate?: Date;
  focusDate?: Date;
  calendar: CalendarType;

  dates: DatesTypes;

  time: {
    interval: number;
    useLocales: boolean;
    minTime?: {
      h: number;
      m: number;
    };
    maxTime?: {
      h: number;
      m: number;
    };
  };
  years: {
    numberOfYears: number;
    mode: "decade" | "fluid" | "exact";
    step: number;
  };
  locale: LocalTypes;
  exclude: {
    day?: (typeof WEEK_DAYS)[number][];
    date?: Date[];
    // month?: DPMonthInteger[];
    // monthDate?: Date[];
    // year?: number[];
  };
};

interface DPDateParts {
  D: number;
  M: number;
  Y: number;
}

const newDate = (Y?: number, M?: number, ...rest: number[]): Date =>
  !Y || M == null ? new Date() : new Date(Y, M, ...rest);

// Days in order sun = 0 ... sat = 6
const getDay = (d: Date): number => d.getDay();

const getDateParts = (d: Date): DPDateParts => ({
  D: d.getDate(),
  M: d.getMonth(),
  Y: d.getFullYear(),
});

const daysInMonth = (d: Date): number =>
  newDate(getDateParts(d).Y, getDateParts(d).M + 1, 0).getDate();

const getStartOffset = (d: Date, startDay: number): number =>
  (getDay(d) + 7 - startDay) % 7;

const getCalendarMonthParams = (
  month: number,
  year: number,
  { mode, startDay }: any
): {
  start: number;
  length: number;
} => {
  const firstMonthDay = newDate(year, month, 1);
  const lastDay = daysInMonth(firstMonthDay);

  const startOffset = getStartOffset(firstMonthDay, startDay);

  const length =
    mode === "static"
      ? NUMBER_OF_STATIC_CALENDAR_DAYS
      : startOffset +
        lastDay +
        6 -
        getStartOffset(newDate(year, month, lastDay), startDay);

  return {
    start: startOffset,
    length,
  };
};

const toLocaleDateString = (
  d: Date,
  locale?: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions
): string => d.toLocaleDateString(locale, options);

const isSame = (d1: Date, d2: Date): boolean => +d1 === +d2;

// /*
//  * We need this function to eliminate time from the comparison.
//  * All date that comes to DP should go through this function.
//  */
export const getCleanDate = (d: Date): Date =>
  newDate(getDateParts(d).Y, getDateParts(d).M);

const formatMonthName = (d: Date, { locale, monthName }: any): string =>
  toLocaleDateString(d, locale, { month: monthName });

const includeDate = (dates: Date[], d: Date): boolean =>
  dates.some((date) => isSame(getCleanDate(date), getCleanDate(d)));

const locale: LocalTypes = {
  day: "2-digit",
  hour: "2-digit",
  hour12: undefined,
  locale: "en-US",
  minute: "2-digit",
  monthName: "short",
  options: {
    day: "2-digit",
    month: "long",
    year: "2-digit",
  },
  second: undefined,
  weekday: "short",
  year: "numeric",
};

export default function createCalendar({ offsetDate, selectedDates, config }: any) {
  const { calendar } = config;
  const { locale: localeStr, day, year } = locale;
  const { M, Y } = getDateParts(offsetDate);
  const { start, length } = getCalendarMonthParams(M, Y, calendar);

  const days = [];

  for (let i = 1; i <= length; i++) {
    const date = newDate(Y, M, i - start);

    days.push({
      $date: date,
      day: toLocaleDateString(date, localeStr, { day }),
      now: isSame(getCleanDate(newDate()), date),
      // disabled:
      //   minDateAndBefore(minDate, date) ||
      //   maxDateAndAfter(maxDate, date) ||
      //   isExcluded(date, exclude),
      selected: includeDate(selectedDates, date),
      inCurrentMonth: getDateParts(date).M === M,
    });
  }

  return {
    year: toLocaleDateString(offsetDate, localeStr, { year }),
    month: formatMonthName(offsetDate, locale),
    days,
  };
}

export type DPDatesMode = "single" | "multiple" | "range";
export interface DPDatesConfig {
  mode: DPDatesMode;
  minDate?: Date;
  maxDate?: Date;
  toggle: boolean;
  limit?: number;
  selectSameDate: boolean;
  // exclude?: DPDateExclude;
}
