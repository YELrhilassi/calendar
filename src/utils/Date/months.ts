const NUMBER_OF_MONTHS = 12;

// Sample data
const _offsetDate = new Date(2023, 1, 1); // May 2023
const _selectedDates = [new Date(2023, 3, 15), new Date(2023, 5, 10)]; // Selected dates in April and June
const _locale: {
  locale: Intl.LocalesArgument;
  monthName: Intl.DateTimeFormatOptions["month"];
} = {
  locale: "en-US",
  monthName: "long",
};

const _minDate = new Date(2023, 3, 1); // Minimum allowed date (April 2023)
const _maxDate = new Date(2023, 7, 1); // Maximum allowed date (August 2023)

export default function createMonths(
  offsetDate = _offsetDate,
  selectedDates = _selectedDates,
  locale = _locale,
  minDate = _minDate,
  maxDate = _maxDate
) {
  const months = [];
  const M = offsetDate.getMonth();
  const Y = offsetDate.getFullYear();
  const now = new Date();
  const nM = now.getMonth();
  const nY = now.getFullYear();

  for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
    const $date = new Date(Y, i, 1);

    months.push({
      $date,
      month: $date.toLocaleDateString(locale.locale, { month: locale.monthName }),
      selected: selectedDates.some((d) => {
        const dM = d.getMonth();
        const dY = d.getFullYear();
        return dY === Y && dM === i;
      }),
      active: M === i,
      now: i === nM && Y === nY,
      disabled:
        i < minDate.getMonth() ||
        Y < minDate.getFullYear() ||
        i > maxDate.getMonth() ||
        Y > maxDate.getFullYear(),
    });
  }

  return months;
}
// Utility functions to replace your date manipulation functions
function getDateParts(date: Date) {
  return {
    Y: date.getFullYear(),
    M: date.getMonth(),
  };
}
export function newDate(year?: number, month?: number, ...rest: number[]) {
  return !year || !month ? new Date() : new Date(year, month, ...rest);
}

function getDay(date: Date) {
  return date.getDay();
}

function getLastDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function formatDayName(date: Date, locale: any) {
  return date.toLocaleDateString(locale.locale, { day: locale.day });
}

function formatYear(date: Date, locale: any) {
  return date.toLocaleDateString(locale.locale, { year: locale.year });
}

function formatMonthName(date: Date, locale: any) {
  return date.toLocaleDateString(locale.locale, { month: locale.monthName });
}

function isBeforeMinDate(date: Date, minDate: Date | undefined) {
  return minDate && date < minDate;
}

function isAfterMaxDate(date: Date, maxDate: Date | undefined) {
  return maxDate && date > maxDate;
}
