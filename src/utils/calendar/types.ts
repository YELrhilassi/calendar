type locale = string;
type Year = "YY" | "YYYY";
type Month = "M" | "MM" | "MMM" | "MMMM";
type MonthDay = "D" | "DD";
type WeekDay = "d" | "ddd" | "dddd";

// type HourFormat = "H" | "HH" | "h" | "hh";

// type MinuteFormat = "m" | "mm";

// type SecondFormat = "s" | "ss";

// type MillisecondFormat = "SSS";

// type OffsetFormat = "Z" | "ZZ";

// type AmPmFormat = "A" | "a";

export type DateFormat = {
  year: Year;
  month: Month;
  monthDay: MonthDay;
  weekDay: WeekDay;
};
