import {
  toTransactionBatch,
  toTransactionSummary,
} from "./transaction-response.utility";

import { describe, it, expect } from "vitest";

const TRANSACTION = {
  vendor: null,
  currency: "ILS",
  amount: "42.90",
  subscriptionId: null,
  transactionDate: "2026-09-14",
  originalDescription: "RAMI LEVY",
  id: "c1f0c0de-0000-4000-8000-000000000001",
};

describe("toTransactionBatch", () => {
  it("accepts a page that points to the next one", () => {
    const batch = {
      items: [TRANSACTION],
      nextCursor: {
        id: TRANSACTION.id,
        createdAt: "2026-09-27T12:56:48.428Z",
      },
    };

    expect(toTransactionBatch(batch)).toEqual(batch);
  });

  it("rejects a page with a malformed cursor", () => {
    const batch = { items: [TRANSACTION], nextCursor: { id: 7 } };

    expect(() => toTransactionBatch(batch)).toThrow();
  });
});

describe("toTransactionSummary", () => {
  it("accepts a summary with uncategorized spend", () => {
    const summary = {
      nonSubscriptionAmount: "4639.60",
      categories: [{ category: null, amount: "45.00" }],
    };

    expect(toTransactionSummary(summary)).toEqual(summary);
  });

  it("rejects a summary without a non-subscription total", () => {
    expect(() => toTransactionSummary({ categories: [] })).toThrow();
  });
});
