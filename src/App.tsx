import { AppointmentsHeader, AppointmentsTable } from "./components/appointments";
import { createCalendar } from "./utils/calendar/createCalendar";
// import createCalendar from "./components/appointments/Date";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
import en from "dayjs/locale/en";
import createWeekdays from "./utils/calendar/createWeekdays";
import { Config } from "./utils/calendar/config";
import createMonths from "./utils/calendar/createMonths";

const initState = {
  selectedDates: [],
  focusDate: new Date(),
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

export const config: Config = {
  locale: {
    locale: en,
    year: "YYYY",
    month: "MMM",
    monthDay: "DD",
    weekDay: "ddd",
  },
};

dayjs.extend(CustomParseFormat);
function App() {
  // const calendar = createCalendar(initState);
  // console.log(calendar);
  const m = createCalendar(dayjs("1996/01/01"), [new Date()], config);
  const b = createWeekdays(config);
  const c = createMonths(dayjs("2023/01/01"), [new Date("2000/01/01")], config);
  console.log(m, b, c);
  // const now = dayjs().date();
  // console.log(now.toDate());

  return (
    <>
      <AppointmentsHeader />
      {/* <AppointmentsTable days={calendar.days} /> */}
    </>
  );
}

export default App;
