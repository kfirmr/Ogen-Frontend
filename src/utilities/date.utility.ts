import {
  DATE_FORMAT,
  HEBREW_MONTH_FULL_NAMES,
  HEBREW_MONTH_SHORT_NAMES,
} from "../constants/date.constants";

import moment from "moment";
import type { IMonthOption } from "../interfaces/date.interface";
import type { IDateRange } from "../components/DatePicker/interfaces/date-range.interface";

export const isSameDate = (a: Date | null, b: Date | null): boolean => {
  if (a === b) {
    return true;
  }

  if (!a || !b) {
    return false;
  }

  return moment(a).isSame(b, "day");
};

export const isBetweenDates = (date: Date, range: IDateRange): boolean => {
  const { startDate, endDate } = range;
  if (!startDate || !endDate) return false;

  return (
    moment(date).isSameOrAfter(startDate, "day") &&
    moment(date).isSameOrBefore(endDate, "day")
  );
};

export const normalizeDate = (date?: Date | string | null) => {
  if (!date) {
    return null;
  }

  return new Date(date);
};

export const formatDate = (
  date: Date | null,
  format = DATE_FORMAT.DATE,
): string => {
  if (!date) {
    return "";
  }

  return moment(date).format(format);
};

export const getDaysAgo = (date: string): number =>
  moment().startOf("day").diff(moment(date).startOf("day"), "days");

export const isDateInMonth = (date: string, monthKey: string): boolean =>
  moment(date).format(DATE_FORMAT.MONTHS_YEAR) === monthKey;

export interface IMonthDateRange {
  toDate: string;
  fromDate: string;
}

export const getMonthDateRange = (monthKey: string): IMonthDateRange => {
  const monthStart = moment(monthKey, DATE_FORMAT.MONTHS_YEAR);

  return {
    fromDate: monthStart
      .clone()
      .startOf("month")
      .format(DATE_FORMAT.DATE_INPUT),
    toDate: monthStart.clone().endOf("month").format(DATE_FORMAT.DATE_INPUT),
  };
};

export const getRecentMonths = ({
  count,
  from = new Date(),
}: {
  count: number;
  from?: Date;
}): IMonthOption[] =>
  Array.from({ length: count }, (_, index) => {
    const date = moment(from).subtract(count - 1 - index, "months");
    const monthIndex = date.month();

    return {
      key: date.format(DATE_FORMAT.MONTHS_YEAR),
      year: date.format("YY"),
      short: HEBREW_MONTH_SHORT_NAMES[monthIndex],
      fullLabel: HEBREW_MONTH_FULL_NAMES[monthIndex],
    };
  });
