import moment from "moment";
import { DATE_FORMAT } from "../constants/date.constants";
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
