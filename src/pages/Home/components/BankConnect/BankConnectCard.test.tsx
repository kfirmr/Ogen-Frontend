import {
  TRANSACTIONS_QUERY_KEY,
  TRANSACTION_SUMMARY_QUERY_KEY,
} from "../../../../constants/transaction.constants";

import BankConnectCard from "./BankConnectCard";
import userEvent from "@testing-library/user-event";
import { render, screen, act } from "@testing-library/react";
import { setSession, clearSession } from "../../../../store/auth.store";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { bankConnectionService } from "../../../../services/bank-connection.service";
import type { IBankConnection } from "../../../../interfaces/bank-connection.interface";
import type { TBankConnectionStatusType } from "../../../../constants/bank-connection.constants";

const SESSION = {
  accessToken: "a.jwt.token",
  user: {
    fullName: "מיכל",
    email: "michal@ogen.co.il",
    id: "a5f0c0de-0000-4000-8000-000000000001",
  },
};

const buildConnection = (
  status: TBankConnectionStatusType,
): IBankConnection => ({
  status,
  company: "max",
  lastError: null,
  lastSyncedAt: null,
  otpRequestedAt: null,
  createdAt: "2026-09-26T00:00:00.000Z",
  id: "b6f0c0de-0000-4000-8000-000000000002",
  loginHint: { idLastDigits: null, cardLastDigits: null, usernamePrefix: "mi" },
});

const ISRACARD_ACCOUNT: IBankConnection = {
  status: "ACTIVE",
  lastError: null,
  company: "isracard",
  otpRequestedAt: null,
  createdAt: "2026-09-21T09:00:00.000Z",
  lastSyncedAt: "2026-09-26T03:12:00.000Z",
  id: "b6f0c0de-0000-4000-8000-000000000003",
  loginHint: {
    idLastDigits: "789",
    usernamePrefix: null,
    cardLastDigits: "4821",
  },
};

const renderCard = (
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  }),
) =>
  render(
    <QueryClientProvider client={queryClient}>
      <BankConnectCard />
    </QueryClientProvider>,
  );

describe("BankConnectCard", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    clearSession();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("asks for the chosen company's login fields and only enables connect once they are filled", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    renderCard();

    await user.click(screen.getByRole("button", { name: /ישראכרט/ }));

    expect(screen.getByText("התחברות לישראכרט")).toBeInTheDocument();
    expect(screen.getByText("תעודת זהות")).toBeInTheDocument();
    expect(screen.getByText("6 ספרות אחרונות של הכרטיס")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "חבר חשבון" })).toBeDisabled();

    const [idInput, cardInput] = screen.getAllByRole("textbox");

    await user.type(idInput, "12a3456789");
    await user.type(cardInput, "123456");
    await user.type(document.querySelector("input[type=password]")!, "secret");

    expect(idInput).toHaveValue("123456789");
    expect(screen.getByRole("button", { name: "חבר חשבון" })).toBeEnabled();
  });

  it("validates the login in the background and shows the connected account once it is active", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const connect = vi
      .spyOn(bankConnectionService, "connect")
      .mockResolvedValue(buildConnection("PENDING_VALIDATION"));

    vi.spyOn(bankConnectionService, "getById")
      .mockResolvedValueOnce(buildConnection("SYNCING"))
      .mockResolvedValue(buildConnection("ACTIVE"));

    renderCard();
    await user.click(screen.getByRole("button", { name: /מקס/ }));
    await user.type(screen.getAllByRole("textbox")[0], "michal");
    await user.type(document.querySelector("input[type=password]")!, "secret");
    await user.click(screen.getByRole("button", { name: "חבר חשבון" }));

    expect(connect).toHaveBeenCalledWith({
      company: "max",
      credentials: { username: "michal", password: "secret" },
    });
    expect(await screen.findByText("מאמתים מול מקס…")).toBeInTheDocument();

    await act(() => vi.advanceTimersByTimeAsync(4000));

    expect(await screen.findByText("מחובר")).toBeInTheDocument();
    expect(screen.getByText("mi•••")).toBeInTheDocument();
    expect(screen.getByText(/החשבון חובר — קיבלת/)).toBeInTheDocument();
  });

  it("offers a retry with the password cleared when the bank rejects the login", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    vi.spyOn(bankConnectionService, "connect").mockResolvedValue(
      buildConnection("INVALID_CREDENTIALS"),
    );

    renderCard();
    await user.click(screen.getByRole("button", { name: /מקס/ }));
    await user.type(screen.getAllByRole("textbox")[0], "michal");
    await user.type(document.querySelector("input[type=password]")!, "wrong");
    await user.click(screen.getByRole("button", { name: "חבר חשבון" }));

    expect(await screen.findByText("הפרטים לא התאימו")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "נסה שוב" }));

    expect(screen.getAllByRole("textbox")[0]).toHaveValue("michal");
    expect(document.querySelector("input[type=password]")).toHaveValue("");
  });

  it("keeps the login and explains when the details could not be sent", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(bankConnectionService, "connect").mockRejectedValue(
      new Error("Network Error"),
    );

    renderCard();
    await user.click(screen.getByRole("button", { name: /מקס/ }));
    await user.type(screen.getAllByRole("textbox")[0], "michal");
    await user.type(document.querySelector("input[type=password]")!, "secret");
    await user.click(screen.getByRole("button", { name: "חבר חשבון" }));

    expect(
      await screen.findByText(
        "לא הצלחנו לשלוח את הפרטים. בדוק את החיבור לאינטרנט ונסה שוב.",
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[0]).toHaveValue("michal");
  });

  it("shows the saved account's masked login and dates on the next visit", async () => {
    setSession(SESSION);
    vi.spyOn(bankConnectionService, "getByUser").mockResolvedValue([
      ISRACARD_ACCOUNT,
    ]);

    renderCard();

    expect(await screen.findByText("כרטיס אשראי")).toBeInTheDocument();
    expect(screen.getByText("ישראכרט")).toBeInTheDocument();
    expect(screen.getByText("•••• 4821")).toBeInTheDocument();
    expect(screen.getByText("••••••789")).toBeInTheDocument();
    expect(screen.getByText("21.09.2026")).toBeInTheDocument();
    expect(screen.queryByText(/החשבון חובר — קיבלת/)).not.toBeInTheDocument();
  });

  it("disconnects the account after confirming and returns to the company picker", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    setSession(SESSION);
    vi.spyOn(bankConnectionService, "getByUser")
      .mockResolvedValueOnce([ISRACARD_ACCOUNT])
      .mockResolvedValue([]);
    const disconnect = vi
      .spyOn(bankConnectionService, "disconnect")
      .mockImplementation(() => Promise.resolve());
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const invalidateQueries = vi.spyOn(queryClient, "invalidateQueries");

    renderCard(queryClient);
    await user.click(
      await screen.findByRole("button", { name: "ניתוק החשבון" }),
    );

    expect(screen.getByText("לנתק את ישראכרט?")).toBeInTheDocument();
    expect(screen.getByText(/ואת המנויים שחויבו רק בו/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "נתק" }));

    expect(disconnect).toHaveBeenCalledWith(ISRACARD_ACCOUNT.id);
    expect(await screen.findByText("חיבור חשבון")).toBeInTheDocument();
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: TRANSACTIONS_QUERY_KEY,
    });
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: TRANSACTION_SUMMARY_QUERY_KEY,
    });
  });

  it("keeps the account and explains when disconnecting fails", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    setSession(SESSION);
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(bankConnectionService, "getByUser").mockResolvedValue([
      ISRACARD_ACCOUNT,
    ]);
    vi.spyOn(bankConnectionService, "disconnect").mockRejectedValue(
      new Error("Network Error"),
    );

    renderCard();
    await user.click(
      await screen.findByRole("button", { name: "ניתוק החשבון" }),
    );
    await user.click(screen.getByRole("button", { name: "נתק" }));

    expect(
      await screen.findByText("הניתוק נכשל. נסה שוב בעוד רגע."),
    ).toBeInTheDocument();
    expect(screen.getByText("•••• 4821")).toBeInTheDocument();
  });
});
