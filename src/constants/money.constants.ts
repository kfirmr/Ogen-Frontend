import { NUMBER_FORMAT_LOCALE } from "./locales.constants";

export const DEFAULT_CURRENCY = "ILS";

export const MONEY_FORMAT = {
  LOCALE: NUMBER_FORMAT_LOCALE,
  MAXIMUM_FRACTION_DIGITS: 0,
} as const;

export const CURRENCY_SYMBOLS: Record<string, string> = {
  ILS: "₪",
  USD: "$",
  EUR: "€",
};
