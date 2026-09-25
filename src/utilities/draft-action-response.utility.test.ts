import { describe, it, expect } from "vitest";
import { toDraftActionBatch } from "./draft-action-response.utility";

const buildRawDraftAction = (overrides: Record<string, unknown> = {}) => ({
  id: "a1f0c0de-0000-4000-8000-000000000001",
  body: "אבקש לבטל את המנוי",
  status: "DRAFTED",
  subject: "ביטול מנוי",
  reasoning: "המחיר גבוה מהשוק",
  targetEmail: "support@example.com",
  subscriptionId: "c1f0c0de-0000-4000-8000-000000000001",
  insightId: "b1f0c0de-0000-4000-8000-000000000001",
  createdAt: "2026-09-01T10:00:00.000Z",
  ...overrides,
});

describe("toDraftActionBatch", () => {
  it("accepts a well-formed batch, including nullable reasoning and email", () => {
    const data = {
      nextCursor: null,
      items: [
        buildRawDraftAction(),
        buildRawDraftAction({ reasoning: null, targetEmail: null }),
      ],
    };

    expect(toDraftActionBatch(data)).toBe(data);
  });

  it("rejects an item with an unknown status", () => {
    const data = {
      nextCursor: null,
      items: [buildRawDraftAction({ status: "SENT" })],
    };

    expect(() => toDraftActionBatch(data)).toThrow(
      "Invalid draft actions response structure",
    );
  });

  it("rejects an item missing the insight it answers", () => {
    const data = {
      nextCursor: null,
      items: [buildRawDraftAction({ insightId: null })],
    };

    expect(() => toDraftActionBatch(data)).toThrow();
  });
});
