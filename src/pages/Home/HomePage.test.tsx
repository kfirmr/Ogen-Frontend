import {
  setSession,
  clearSession,
  restoreSession,
} from "../../store/auth.store";

import moment from "moment";
import HomePage from "./HomePage";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { levelService } from "../../services/level.service";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { transactionService } from "../../services/transaction.service";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { subscriptionService } from "../../services/subscription.service";

const DATE_FORMAT = "YYYY-MM-DD";

const SESSION = {
  accessToken: "a.jwt.token",
  user: {
    id: "a5f0c0de-0000-4000-8000-000000000001",
    email: "michal@ogen.co.il",
    fullName: "מיכל בדיקה",
  },
};

const USER_PROGRESS = {
  totalXp: 150,
  currentLevel: 2,
  xpToNextLevel: 150,
  currentLevelTitle: "חוסך מתמיד",
  nextLevelTitle: "מנהל תקציב",
  nextLevelNumber: 3,
  xpRequiredForNextLevel: 300,
};

const SUBSCRIPTIONS = {
  nextCursor: null,
  items: [
    {
      id: "b1f0c0de-0000-4000-8000-000000000001",
      amount: "69.90",
      currency: "ILS",
      nextChargeDate: null,
      status: "ACTIVE" as const,
      billingCycle: "MONTHLY" as const,
      vendor: {
        id: "c1f0c0de-0000-4000-8000-000000000001",
        name: "Netflix",
        category: "STREAMING" as const,
      },
    },
    {
      id: "b1f0c0de-0000-4000-8000-000000000002",
      amount: "360",
      currency: "ILS",
      nextChargeDate: null,
      status: "ACTIVE" as const,
      billingCycle: "YEARLY" as const,
      vendor: {
        id: "c1f0c0de-0000-4000-8000-000000000002",
        name: "Space Gym",
        category: "FITNESS" as const,
      },
    },
  ],
};

const TRANSACTIONS = {
  nextCursor: null,
  items: [
    {
      id: "d1f0c0de-0000-4000-8000-000000000001",
      amount: "320.00",
      currency: "ILS",
      vendor: null,
      originalDescription: "מסעדת האחים",
      transactionDate: moment().format(DATE_FORMAT),
    },
    {
      id: "d1f0c0de-0000-4000-8000-000000000002",
      amount: "850.00",
      currency: "ILS",
      originalDescription: "CHEVRAT HASHMAL",
      transactionDate: moment().subtract(1, "day").format(DATE_FORMAT),
      vendor: {
        id: "c1f0c0de-0000-4000-8000-000000000003",
        name: "חברת החשמל",
        category: "UTILITIES" as const,
      },
    },
    {
      id: "d1f0c0de-0000-4000-8000-000000000003",
      amount: "240.00",
      currency: "ILS",
      originalDescription: "CELLCOM",
      transactionDate: moment().subtract(4, "days").format(DATE_FORMAT),
      vendor: {
        id: "c1f0c0de-0000-4000-8000-000000000004",
        name: "סלקום",
        category: "COMMUNICATION" as const,
      },
    },
  ],
};

const renderHomePage = () =>
  render(
    <QueryClientProvider
      client={
        new QueryClient({ defaultOptions: { queries: { retry: false } } })
      }
    >
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </QueryClientProvider>,
  );

describe("HomePage", () => {
  beforeEach(() => {
    clearSession();
    vi.restoreAllMocks();
    vi.spyOn(levelService, "getUserProgress").mockResolvedValue(USER_PROGRESS);
    vi.spyOn(subscriptionService, "getByUser").mockResolvedValue(SUBSCRIPTIONS);
    vi.spyOn(transactionService, "getByUser").mockResolvedValue(TRANSACTIONS);
  });

  it("greets the signed-in user", () => {
    setSession(SESSION);

    renderHomePage();

    expect(screen.getByText("שלום, מיכל בדיקה")).toBeInTheDocument();
  });

  it("still greets the right user after a refresh restores the session", () => {
    setSession(SESSION);
    restoreSession();

    renderHomePage();

    expect(screen.getByText("שלום, מיכל בדיקה")).toBeInTheDocument();
  });

  it("shows the level and xp fetched from the server", async () => {
    setSession(SESSION);

    renderHomePage();

    expect(await screen.findByText("רמה 2 · חוסך מתמיד")).toBeInTheDocument();
    expect(screen.getByText("רמה 2 · 150 XP")).toBeInTheDocument();
    expect(
      screen.getByText("עוד 150 XP כדי להגיע לדרגת מנהל תקציב"),
    ).toBeInTheDocument();
  });

  it("does not request progress for a signed-out visitor", () => {
    renderHomePage();

    expect(levelService.getUserProgress).not.toHaveBeenCalled();
  });

  it("charts the fetched subscriptions as monthly expenses in the overview tab", async () => {
    setSession(SESSION);

    renderHomePage();

    expect(await screen.findByText("100 ₪")).toBeInTheDocument();
    expect(screen.getByText("מצאנו 100 ₪ לחיסכון")).toBeInTheDocument();
    expect(screen.getByText("70 ₪")).toBeInTheDocument();
    expect(screen.getByText("30 ₪")).toBeInTheDocument();
    expect(screen.getByText("Netflix")).toBeInTheDocument();
    expect(screen.getByText("Space Gym")).toBeInTheDocument();
  });

  it("lists the fetched subscriptions after switching to the subs tab", async () => {
    setSession(SESSION);

    renderHomePage();
    await screen.findByText("100 ₪");

    await userEvent.click(screen.getByText("מנויים"));

    expect(await screen.findByText("Netflix")).toBeInTheDocument();
    expect(screen.getByText("Space Gym")).toBeInTheDocument();
    expect(screen.getAllByText("ביטול")).toHaveLength(2);
  });

  it("sums the fetched transactions per vendor category after switching to the cats tab", async () => {
    setSession(SESSION);

    renderHomePage();
    await screen.findByText("100 ₪");

    await userEvent.click(screen.getByText("קטגוריות"));

    expect(await screen.findByText("דיור")).toBeInTheDocument();
    expect(screen.getByText("תקשורת")).toBeInTheDocument();
    expect(screen.getByText("אחר")).toBeInTheDocument();
    expect(screen.getByText("850")).toBeInTheDocument();
    expect(screen.getByText("320")).toBeInTheDocument();
    expect(screen.getByText("240")).toBeInTheDocument();
  });

  it("lists the fetched transactions with their day labels after switching to the tx tab", async () => {
    setSession(SESSION);

    renderHomePage();
    await screen.findByText("100 ₪");

    await userEvent.click(screen.getByText("תנועות"));

    expect(await screen.findByText("מסעדת האחים")).toBeInTheDocument();
    expect(screen.getByText("היום")).toBeInTheDocument();
    expect(screen.getByText("אתמול")).toBeInTheDocument();
    expect(screen.getByText("-320 ₪")).toBeInTheDocument();
    expect(screen.getByText("-850 ₪")).toBeInTheDocument();
    expect(screen.getByText("-240 ₪")).toBeInTheDocument();
  });
});
