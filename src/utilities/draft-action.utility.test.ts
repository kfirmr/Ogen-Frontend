import { describe, it, expect } from "vitest";
import { getDraftActionsByInsightId } from "./draft-action.utility";
import type { IDraftActionRecord } from "../interfaces/draft-action.interface";

const draftAction: IDraftActionRecord = {
  id: "a1f0c0de-0000-4000-8000-000000000001",
  status: "DRAFTED",
  reasoning: null,
  subject: "ביטול מנוי",
  body: "אבקש לבטל את המנוי",
  targetEmail: "support@example.com",
  createdAt: "2026-09-01T10:00:00.000Z",
  insightId: "b1f0c0de-0000-4000-8000-000000000001",
  subscriptionId: "c1f0c0de-0000-4000-8000-000000000001",
};

describe("getDraftActionsByInsightId", () => {
  it("indexes each draft action by the insight it answers", () => {
    const draftActionsByInsightId = getDraftActionsByInsightId([draftAction]);

    expect(draftActionsByInsightId.get(draftAction.insightId)).toBe(
      draftAction,
    );
  });
});
