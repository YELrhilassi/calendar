import dayjs from "dayjs";
import { Config } from "./config";
import { WEEK_DAYS } from "./constants";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function createWeekdays({ locale: { locale, weekDay } }: Config) {
  return WEEK_DAYS.map((day) => {
    return dayjs().day(day).locale(locale).format(weekDay).replace(".", "");
  });
}
