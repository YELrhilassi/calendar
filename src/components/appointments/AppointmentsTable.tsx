import classNames from "classnames";

export default function AppointmentsTable({ days }: any) {
  return (
    <table className="shadow w-full ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
      <thead>
        <tr className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <th className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </th>
          <th className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </th>
          <th className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </th>
          <th className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </th>
          <th className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </th>
          <th className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </th>
          <th className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </th>
        </tr>
      </thead>
      <tbody className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
        <tr className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
          {days.map((day: any) => (
            <td
              key={day.day}
              className={classNames(
                day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
                "relative py-2 px-3"
              )}
            >
              <time
                dateTime={day.date}
                className={
                  day.isToday
                    ? "flex h-6 w-6 items-center justify-center rounded-full bg-green-600 font-semibold text-white"
                    : undefined
                }
              >
                {day.date.split("-").pop()!.replace(/^0/, "")}
              </time>
              {day.events.length > 0 && (
                <ol className="mt-2">
                  {day.events.slice(0, 2).map((event: any) => (
                    <li key={event.id}>
                      <a href={event.href} className="group flex">
                        <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-green-600">
                          {event.name}
                        </p>
                        <time
                          dateTime={event.datetime}
                          className="ml-3 hidden flex-none text-gray-500 group-hover:text-green-600 xl:block"
                        >
                          {event.time}
                        </time>
                      </a>
                    </li>
                  ))}
                  {day.events.length > 2 && (
                    <li className="text-gray-500">+ {day.events.length - 2} more</li>
                  )}
                </ol>
              )}
            </td>
          ))}
        </tr>
        <tr className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
          {days.map((day: any) => (
            <td
              key={day.date}
              className={classNames(
                day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                (day.isSelected || day.isToday) && "font-semibold",
                day.isSelected && "text-white",
                !day.isSelected && day.isToday && "text-green-600",
                !day.isSelected && day.isCurrentMonth && !day.isToday && "text-gray-900",
                !day.isSelected && !day.isCurrentMonth && !day.isToday && "text-gray-500",
                "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
              )}
            >
              <time
                dateTime={day.date}
                className={classNames(
                  day.isSelected &&
                    "flex h-6 w-6 items-center justify-center rounded-full",
                  day.isSelected && day.isToday && "bg-green-600",
                  day.isSelected && !day.isToday && "bg-gray-900",
                  "ml-auto"
                )}
              >
                {day.date.split("-").pop()!.replace(/^0/, "")}
              </time>
              <span className="sr-only">{day.events.length} events</span>
              {day.events.length > 0 && (
                <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                  {day.events.map((event: any) => (
                    <span
                      key={event.id}
                      className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                    ></span>
                  ))}
                </span>
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
