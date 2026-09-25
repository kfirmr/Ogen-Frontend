import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import CancelSubscriptionPopup from "./CancelSubscriptionPopup";
import type { ICancellationRequest } from "../../interfaces/subscription-cancellation.interface";

const request: ICancellationRequest = {
  draftAction: null,
  channel: { type: "EMAIL", target: "cancel@netflix.com" },
  yearlyCostLabel: "828 ₪ בשנה",
  subscription: {
    icon: "icon.png",
    name: "Netflix",
    price: "69 ₪ / חודש",
    id: "c1f0c0de-0000-4000-8000-000000000001",
  },
  email: {
    body: "שלום, אבקש לבטל",
    subject: "בקשה לביטול מנוי - Netflix",
    recipient: "cancel@netflix.com",
  },
};

const renderPopup = (popupRequest: ICancellationRequest = request) => {
  const onSend = vi.fn().mockResolvedValue(undefined);
  const onClose = vi.fn();

  render(
    <CancelSubscriptionPopup
      onSend={onSend}
      onClose={onClose}
      request={popupRequest}
    />,
  );

  return { onSend, onClose };
};

describe("CancelSubscriptionPopup", () => {
  it("shows the subscription, its yearly cost and the prefilled email", () => {
    renderPopup();

    expect(screen.getByText("ביטול Netflix")).toBeInTheDocument();
    expect(screen.getByText("69 ₪ / חודש")).toBeInTheDocument();
    expect(screen.getByText("828 ₪ בשנה")).toBeInTheDocument();
    expect(screen.getByText("נשלח אל")).toBeInTheDocument();
    expect(screen.getByDisplayValue("cancel@netflix.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("שלום, אבקש לבטל")).toBeInTheDocument();
  });

  it("sends the email as the user edited it, then closes", async () => {
    const user = userEvent.setup();
    const { onSend, onClose } = renderPopup();

    await user.type(screen.getByDisplayValue("שלום, אבקש לבטל"), " תודה");
    await user.click(screen.getByRole("button", { name: "שליחה" }));

    expect(onSend).toHaveBeenCalledWith({
      ...request.email,
      body: "שלום, אבקש לבטל תודה",
    });
    expect(onClose).toHaveBeenCalled();
  });

  it("enables sending while every field is valid", () => {
    renderPopup();

    expect(screen.getByRole("button", { name: "שליחה" })).toBeEnabled();
  });

  it("blocks sending when the recipient is not a valid email", async () => {
    const user = userEvent.setup();
    renderPopup();

    const recipient = screen.getByDisplayValue("cancel@netflix.com");
    await user.clear(recipient);
    await user.type(recipient, "not-an-email");

    expect(screen.getByRole("button", { name: "שליחה" })).toBeDisabled();
    expect(screen.getByText("כתובת דוא״ל לא תקינה")).toBeInTheDocument();
  });

  it("blocks sending when the email body is cleared", async () => {
    const user = userEvent.setup();
    renderPopup();

    await user.clear(screen.getByDisplayValue("שלום, אבקש לבטל"));

    expect(screen.getByRole("button", { name: "שליחה" })).toBeDisabled();
    expect(screen.getByText("שדה חובה")).toBeInTheDocument();
  });

  it("accepts a long, mixed-language email body", async () => {
    const user = userEvent.setup();
    renderPopup();

    await user.type(
      screen.getByDisplayValue("שלום, אבקש לבטל"),
      " את המנוי שלי ל-Netflix החל מהיום, ולהפסיק כל חיוב עתידי. Thanks!",
    );

    expect(screen.getByRole("button", { name: "שליחה" })).toBeEnabled();
  });

  it("opens the vendor's cancellation page when it is cancelled on the web", async () => {
    const user = userEvent.setup();
    const { onSend } = renderPopup({
      ...request,
      channel: { type: "LINK", target: "https://www.netflix.com/cancelplan" },
    });

    expect(
      screen.getByDisplayValue("https://www.netflix.com/cancelplan"),
    ).toBeInTheDocument();
    expect(screen.queryByText("תוכן המייל")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "למעבר לדף הביטול" }));

    expect(onSend).toHaveBeenCalled();
  });

  it("offers to dial the cancellation line when it is cancelled by phone", () => {
    renderPopup({ ...request, channel: { type: "PHONE", target: "*8979" } });

    expect(screen.getByDisplayValue("*8979")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "התקשרות לביטול" }),
    ).toBeEnabled();
  });

  it("closes without sending from the cancel button", async () => {
    const user = userEvent.setup();
    const { onSend, onClose } = renderPopup();

    await user.click(screen.getByRole("button", { name: "ביטול" }));

    expect(onClose).toHaveBeenCalled();
    expect(onSend).not.toHaveBeenCalled();
  });
});
