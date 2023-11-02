import { DateFormat } from "./types";
import loc from "dayjs/locale/en";

export type Config = {
  locale: {
    locale: typeof loc;
    year: DateFormat["year"];
    month: DateFormat["month"];
    monthDay: DateFormat["monthDay"];
    weekDay: DateFormat["weekDay"];
  };
};

// export const config: Config = {
//   locale: {
//     locale: "en",
//     year: "YYYY",
//     month: "MMM",
//     monthDay: "DD",
//     weekDay: "ddd",
//   },
// };
