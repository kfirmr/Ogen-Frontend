import { describe, it, expect } from "vitest";
import { getLatestTransactionMonthKey } from "./transaction.utility";
import type { ITransaction } from "../interfaces/transaction.interface";

const buildTransaction = (transactionDate: string): ITransaction => ({
  transactionDate,
  id: "t1",
  vendor: null,
  amount: "10.00",
  currency: "ILS",
  subscriptionId: null,
  originalDescription: "Test",
});

describe("getLatestTransactionMonthKey", () => {
  it("returns null for an empty list", () => {
    expect(getLatestTransactionMonthKey([])).toBeNull();
  });

  it("returns the month of the only transaction", () => {
    expect(getLatestTransactionMonthKey([buildTransaction("2026-08-15")])).toBe(
      "2026-08",
    );
  });

  it("picks the latest date's month regardless of array order", () => {
    const transactions = [
      buildTransaction("2026-07-31"),
      buildTransaction("2026-08-23"),
      buildTransaction("2026-08-01"),
    ];

    expect(getLatestTransactionMonthKey(transactions)).toBe("2026-08");
  });
});
