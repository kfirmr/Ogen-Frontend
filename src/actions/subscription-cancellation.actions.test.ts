import { insightService } from "../services/insight.service";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { draftActionService } from "../services/draft-action.service";
import { subscriptionService } from "../services/subscription.service";
import { WebNavigationManager } from "../utilities/web-navigation.manager";
import { sendCancellationAction } from "./subscription-cancellation.actions";
import type { IDraftActionRecord } from "../interfaces/draft-action.interface";
import type { ICancellationRequest } from "../interfaces/subscription-cancellation.interface";

const email = {
  subject: "ביטול",
  body: "גוף שנערך",
  recipient: "cancel@netflix.com",
};

const draftAction: IDraftActionRecord = {
  status: "DRAFTED",
  reasoning: null,
  subject: "ביטול",
  body: "טיוטה",
  targetEmail: "cancel@netflix.com",
  createdAt: "2026-09-01T10:00:00.000Z",
  id: "a1f0c0de-0000-4000-8000-000000000001",
  insightId: "b1f0c0de-0000-4000-8000-000000000001",
  subscriptionId: "c1f0c0de-0000-4000-8000-000000000001",
};

const SUBSCRIPTION_ID = "c1f0c0de-0000-4000-8000-000000000001";

const buildRequest = (
  overrides: Partial<ICancellationRequest> = {},
): ICancellationRequest => ({
  email,
  draftAction: null,
  yearlyCostLabel: "828 ₪ בשנה",
  channel: { type: "EMAIL", target: email.recipient },
  subscription: {
    icon: "icon.png",
    name: "Netflix",
    id: SUBSCRIPTION_ID,
    price: "69 ₪ / חודש",
  },
  ...overrides,
});

describe("sendCancellationAction", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(insightService, "updateStatus").mockResolvedValue();
    vi.spyOn(draftActionService, "updateStatus").mockResolvedValue();
    vi.spyOn(WebNavigationManager, "dial").mockImplementation(() => {});
    vi.spyOn(WebNavigationManager, "openUrl").mockImplementation(() => {});
    vi.spyOn(WebNavigationManager, "openMail").mockImplementation(() => {});
    vi.spyOn(subscriptionService, "requestCancellation").mockResolvedValue();
  });

  it("records the request with the address used, then opens the edited email", async () => {
    await sendCancellationAction(buildRequest(), email);

    expect(subscriptionService.requestCancellation).toHaveBeenCalledWith(
      SUBSCRIPTION_ID,
      "cancel@netflix.com",
    );
    expect(draftActionService.updateStatus).not.toHaveBeenCalled();
    expect(WebNavigationManager.openMail).toHaveBeenCalledWith(email);
  });

  it("opens the vendor's cancellation page without recording an address", async () => {
    const url = "https://www.netflix.com/cancelplan";

    await sendCancellationAction(
      buildRequest({ channel: { type: "LINK", target: url } }),
      email,
    );

    expect(subscriptionService.requestCancellation).toHaveBeenCalledWith(
      SUBSCRIPTION_ID,
      null,
    );
    expect(WebNavigationManager.openUrl).toHaveBeenCalledWith(url);
    expect(WebNavigationManager.openMail).not.toHaveBeenCalled();
  });

  it("dials the vendor's cancellation line", async () => {
    await sendCancellationAction(
      buildRequest({ channel: { type: "PHONE", target: "*8979" } }),
      email,
    );

    expect(WebNavigationManager.dial).toHaveBeenCalledWith("*8979");
  });

  it("also approves the AI draft the email came from", async () => {
    await sendCancellationAction(buildRequest({ draftAction }), email);

    expect(draftActionService.updateStatus).toHaveBeenCalledWith(
      draftAction.id,
      "APPROVED",
    );
  });

  it("does not open anything when the server rejects the request", async () => {
    vi.spyOn(subscriptionService, "requestCancellation").mockRejectedValue(
      new Error("already cancelled"),
    );

    await expect(sendCancellationAction(buildRequest(), email)).rejects.toThrow(
      "already cancelled",
    );
    expect(WebNavigationManager.openMail).not.toHaveBeenCalled();
  });
});
