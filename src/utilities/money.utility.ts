import { CURRENCY_SYMBOLS, MONEY_FORMAT } from "../constants/money.constants";

const EXPENSE_SIGN = "-";

interface IFormatMoneyOptions {
  amount: string;
  currency: string;
}

export const formatMoney = (options: IFormatMoneyOptions): string | null => {
  const amount = Number.parseFloat(options.amount);

  if (Number.isNaN(amount)) {
    return null;
  }

  const symbol = CURRENCY_SYMBOLS[options.currency] ?? options.currency;
  const formattedAmount = amount.toLocaleString(MONEY_FORMAT.LOCALE, {
    maximumFractionDigits: MONEY_FORMAT.MAXIMUM_FRACTION_DIGITS,
  });

  return `${formattedAmount} ${symbol}`;
};

export const formatExpense = (options: IFormatMoneyOptions): string | null => {
  const formattedAmount = formatMoney(options);

  if (formattedAmount === null) {
    return null;
  }

  return `${EXPENSE_SIGN}${formattedAmount}`;
};
