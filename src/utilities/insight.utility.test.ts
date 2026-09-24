import { describe, it, expect } from "vitest";
import { toInsightViews } from "./insight.utility";
import type { IInsightRecord } from "../interfaces/insight.interface";

const buildRecord = (
  overrides: Partial<IInsightRecord> = {},
): IInsightRecord => ({
  id: "f1f0c0de-0000-4000-8000-000000000001",
  type: "OVERPAYING",
  status: "UNREAD",
  body: "את משלמת יותר מהממוצע",
  createdAt: "2026-09-01T10:00:00.000Z",
  ...overrides,
});

describe("toInsightViews", () => {
  it("builds a savings label from the estimated monthly savings", () => {
    const [view] = toInsightViews([
      buildRecord({ estimatedMonthlySavings: "45.00" }),
    ]);

    expect(view.savingsLabel).toBe("אפשר לחסוך 45 ₪ בחודש");
  });

  it("omits the savings label when the backend reports no savings", () => {
    const [view] = toInsightViews([
      buildRecord({ type: "HIGH_SPENDING", estimatedMonthlySavings: null }),
    ]);

    expect(view.savingsLabel).toBeNull();
  });

  it("omits the savings label when the field is absent from the response", () => {
    const [view] = toInsightViews([buildRecord()]);

    expect(view.savingsLabel).toBeNull();
  });

  it("omits a non-positive savings amount rather than showing a zero win", () => {
    const [view] = toInsightViews([
      buildRecord({ estimatedMonthlySavings: "0.00" }),
    ]);

    expect(view.savingsLabel).toBeNull();
  });
});
