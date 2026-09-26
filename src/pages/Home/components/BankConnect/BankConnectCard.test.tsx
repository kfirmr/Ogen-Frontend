import BankConnectCard from "./BankConnectCard";
import userEvent from "@testing-library/user-event";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { bankConnectionService } from "../../../../services/bank-connection.service";
import type { IBankConnection } from "../../../../interfaces/bank-connection.interface";
import type { TBankConnectionStatusType } from "../../../../constants/bank-connection.constants";

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
});

const renderCard = () =>
  render(
    <QueryClientProvider
      client={
        new QueryClient({ defaultOptions: { queries: { retry: false } } })
      }
    >
      <BankConnectCard />
    </QueryClientProvider>,
  );

describe("BankConnectCard", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
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

  it("validates the login in the background and celebrates once it is active", async () => {
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

    expect(await screen.findByText("מקס מחובר!")).toBeInTheDocument();
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
});
