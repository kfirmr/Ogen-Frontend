import {
  toCategoryExpenses,
  toNonSubscriptionSegment,
  getNonSubscriptionExpensesTotal,
} from "./transaction.utility";

import { describe, it, expect } from "vitest";
import { VENDOR_CATEGORY_LABELS } from "../constants/vendor.constants";
import type { ITransactionSummary } from "../interfaces/transaction.interface";

const buildSummary = (
  overrides: Partial<ITransactionSummary> = {},
): ITransactionSummary => ({
  categories: [],
  nonSubscriptionAmount: "0",
  ...overrides,
});

describe("toCategoryExpenses", () => {
  it("keeps the four largest categories, largest first", () => {
    const summary = buildSummary({
      categories: [
        { category: "DINING", amount: "300.00" },
        { category: "GROCERIES", amount: "1432.40" },
        { category: "FUEL_ENERGY", amount: "520.00" },
        { category: "STREAMING", amount: "89.80" },
        { category: "PETS", amount: "12.00" },
      ],
    });

    expect(toCategoryExpenses(summary).map((expense) => expense.value)).toEqual(
      [1432, 520, 300, 90],
    );
  });

  it("merges uncategorized spend into the other category", () => {
    const summary = buildSummary({
      categories: [
        { category: "OTHER", amount: "100.00" },
        { category: null, amount: "50.00" },
      ],
    });

    expect(toCategoryExpenses(summary)).toEqual([
      expect.objectContaining({
        value: 150,
        label: VENDOR_CATEGORY_LABELS.OTHER,
      }),
    ]);
  });
});

describe("getNonSubscriptionExpensesTotal", () => {
  it("rounds the server's non-subscription total", () => {
    const summary = buildSummary({ nonSubscriptionAmount: "4639.60" });

    expect(getNonSubscriptionExpensesTotal(summary)).toBe(4640);
  });
});

describe("toNonSubscriptionSegment", () => {
  it("omits the segment for a month without non-subscription spend", () => {
    expect(toNonSubscriptionSegment(buildSummary())).toBeNull();
  });

  it("builds the segment from the non-subscription total", () => {
    const summary = buildSummary({ nonSubscriptionAmount: "812.30" });

    expect(toNonSubscriptionSegment(summary)).toEqual(
      expect.objectContaining({ value: 812 }),
    );
  });
});
