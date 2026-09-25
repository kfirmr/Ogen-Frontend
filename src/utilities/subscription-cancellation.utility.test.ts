import { describe, it, expect } from "vitest";
import type { ISubscription } from "../interfaces/subscription.interface";
import { findCancellationRequest } from "./subscription-cancellation.utility";
import type { IDraftActionRecord } from "../interfaces/draft-action.interface";

const subscription: ISubscription = {
  amount: "69.00",
  currency: "ILS",
  status: "ACTIVE",
  nextChargeDate: null,
  billingCycle: "MONTHLY",
  id: "c1f0c0de-0000-4000-8000-000000000001",
  vendor: {
    name: "Netflix",
    category: "STREAMING",
    cancellationEmail: "cancel@netflix.com",
    id: "d1f0c0de-0000-4000-8000-000000000001",
  },
};

const draftAction: IDraftActionRecord = {
  status: "DRAFTED",
  reasoning: null,
  subject: "בקשה לביטול Netflix",
  body: "טיוטה שהסוכן כתב",
  targetEmail: "help@netflix.com",
  subscriptionId: subscription.id,
  createdAt: "2026-09-01T10:00:00.000Z",
  id: "a1f0c0de-0000-4000-8000-000000000001",
  insightId: "b1f0c0de-0000-4000-8000-000000000001",
};

describe("findCancellationRequest", () => {
  it("returns null when no subscription is being cancelled", () => {
    const request = findCancellationRequest({
      subscriptionId: null,
      subscriberName: "מיכל",
      pendingDraftActions: [],
      subscriptions: [subscription],
    });

    expect(request).toBeNull();
  });

  it("prefills the AI draft when the subscription has one", () => {
    const request = findCancellationRequest({
      subscriberName: "מיכל",
      subscriptionId: subscription.id,
      subscriptions: [subscription],
      pendingDraftActions: [draftAction],
    });

    expect(request?.draftAction).toBe(draftAction);
    expect(request?.email).toEqual({
      body: draftAction.body,
      subject: draftAction.subject,
      recipient: "help@netflix.com",
    });
  });

  it("falls back to a signed template addressed to the vendor's cancellation inbox", () => {
    const request = findCancellationRequest({
      subscriberName: "מיכל",
      pendingDraftActions: [],
      subscriptionId: subscription.id,
      subscriptions: [subscription],
    });

    expect(request?.draftAction).toBeNull();
    expect(request?.email.recipient).toBe("cancel@netflix.com");
    expect(request?.email.body).toContain("לבטל את המנוי שלי ל־Netflix");
    expect(request?.email.body.endsWith("מיכל")).toBe(true);
  });

  it("shows the monthly price and the yearly cost the cancellation saves", () => {
    const request = findCancellationRequest({
      subscriberName: "מיכל",
      pendingDraftActions: [],
      subscriptionId: subscription.id,
      subscriptions: [subscription],
    });

    expect(request?.subscription.price).toBe("69 ₪ / חודש");
    expect(request?.yearlyCostLabel).toBe("828 ₪ בשנה");
  });
});

describe("findCancellationRequest channel", () => {
  const findFor = (
    vendorOverrides: Partial<ISubscription["vendor"]>,
    options: { draftActions?: IDraftActionRecord[]; sentTo?: string } = {},
  ) =>
    findCancellationRequest({
      subscriberName: "מיכל",
      subscriptionId: subscription.id,
      pendingDraftActions: options.draftActions ?? [],
      subscriptions: [
        {
          ...subscription,
          cancellationEmail: options.sentTo ?? null,
          vendor: {
            id: "d1f0c0de-0000-4000-8000-000000000001",
            name: "Netflix",
            category: "STREAMING",
            cancellationEmail: null,
            ...vendorOverrides,
          },
        },
      ],
    });

  it("sends the user to the vendor's page when it is cancelled on the web", () => {
    const request = findFor({
      cancellationMethod: "WEB",
      cancellationUrl: "https://www.netflix.com/cancelplan",
    });

    expect(request?.channel).toEqual({
      type: "LINK",
      target: "https://www.netflix.com/cancelplan",
    });
  });

  it("dials the cancellation line when the vendor is cancelled by phone", () => {
    const request = findFor({
      cancellationMethod: "PHONE",
      cancellationPhone: "*8979",
    });

    expect(request?.channel).toEqual({ type: "PHONE", target: "*8979" });
  });

  it("falls back to email when the vendor's method has no usable detail", () => {
    const request = findFor({
      cancellationMethod: "WEB",
      cancellationUrl: null,
    });

    expect(request?.channel.type).toBe("EMAIL");
  });

  it("keeps a ready AI draft on email even when the vendor has a web page", () => {
    const request = findFor(
      {
        cancellationMethod: "WEB",
        cancellationUrl: "https://www.netflix.com/cancelplan",
      },
      { draftActions: [draftAction] },
    );

    expect(request?.channel.type).toBe("EMAIL");
  });

  it("prefills the address the user already sent to before the vendor's inbox", () => {
    const request = findFor(
      { cancellationEmail: "cancel@netflix.com" },
      { sentTo: "me-chosen@netflix.com" },
    );

    expect(request?.email.recipient).toBe("me-chosen@netflix.com");
  });
});
