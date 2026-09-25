import { approveDraftAction } from "./draft-action.actions";
import { insightService } from "../services/insight.service";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { draftActionService } from "../services/draft-action.service";
import type { IDraftActionRecord } from "../interfaces/draft-action.interface";

const draftAction: IDraftActionRecord = {
  status: "DRAFTED",
  reasoning: null,
  subject: "ביטול מנוי",
  body: "אבקש לבטל את המנוי",
  targetEmail: "support@example.com",
  createdAt: "2026-09-01T10:00:00.000Z",
  id: "a1f0c0de-0000-4000-8000-000000000001",
  insightId: "b1f0c0de-0000-4000-8000-000000000001",
  subscriptionId: "c1f0c0de-0000-4000-8000-000000000001",
};

describe("approveDraftAction", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(insightService, "updateStatus").mockResolvedValue();
    vi.spyOn(draftActionService, "updateStatus").mockResolvedValue();
  });

  it("approves the draft and closes the insight it answered", async () => {
    await approveDraftAction(draftAction);

    expect(draftActionService.updateStatus).toHaveBeenCalledWith(
      draftAction.id,
      "APPROVED",
    );
    expect(insightService.updateStatus).toHaveBeenCalledWith(
      draftAction.insightId,
      "ACTION_TAKEN",
    );
  });
});
