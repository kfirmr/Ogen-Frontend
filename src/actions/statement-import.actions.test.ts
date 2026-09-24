import { uploadStatementAction } from "./statement-import.actions";
import { transactionService } from "../services/transaction.service";
import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import { statementImportService } from "../services/statement-import.service";
import type { IStatementImport } from "../interfaces/statement-import.interface";
import { STATEMENT_UPLOAD_MESSAGES } from "../constants/statement-import.constants";

const buildImport = (
  overrides: Partial<IStatementImport> = {},
): IStatementImport => ({
  id: "e1f0c0de-0000-4000-8000-000000000001",
  source: "XLSX",
  status: "PROCESSING",
  filename: "statement.xlsx",
  transactionCount: 0,
  errorMessage: null,
  completedAt: null,
  createdAt: "2026-09-01T10:00:00.000Z",
  ...overrides,
});

const buildFile = () =>
  new File(["binary"], "statement.xlsx", {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

describe("uploadStatementAction", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.restoreAllMocks();

    vi.spyOn(transactionService, "getByUser").mockResolvedValue({
      nextCursor: null,
      items: [
        {
          id: "d1f0c0de-0000-4000-8000-000000000001",
          amount: "69.90",
          currency: "ILS",
          vendor: null,
          subscriptionId: null,
          originalDescription: "NETFLIX.COM",
          transactionDate: "2026-08-15",
        },
      ],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("polls the import until it completes and reports the final transaction count", async () => {
    vi.spyOn(statementImportService, "upload").mockResolvedValue(buildImport());
    const getById = vi
      .spyOn(statementImportService, "getById")
      .mockResolvedValueOnce(buildImport())
      .mockResolvedValueOnce(
        buildImport({ status: "COMPLETED", transactionCount: 42 }),
      );

    const resultPromise = uploadStatementAction(buildFile());

    await vi.runAllTimersAsync();

    const result = await resultPromise;

    expect(getById).toHaveBeenCalledTimes(2);
    expect(result.errorMessage).toBeNull();
    expect(result.statementImport?.transactionCount).toBe(42);
    expect(result.latestTransactionMonthKey).toBe("2026-08");
  });

  it("does not report a transaction count from the still-processing upload response", async () => {
    vi.spyOn(statementImportService, "upload").mockResolvedValue(buildImport());
    vi.spyOn(statementImportService, "getById").mockResolvedValue(
      buildImport({ status: "COMPLETED", transactionCount: 7 }),
    );

    const resultPromise = uploadStatementAction(buildFile());

    await vi.runAllTimersAsync();

    const result = await resultPromise;

    expect(result.statementImport?.status).toBe("COMPLETED");
    expect(result.statementImport?.transactionCount).toBe(7);
  });

  it("surfaces a failure when the background import ends as FAILED", async () => {
    vi.spyOn(statementImportService, "upload").mockResolvedValue(buildImport());
    vi.spyOn(statementImportService, "getById").mockResolvedValue(
      buildImport({ status: "FAILED", errorMessage: "every row failed" }),
    );

    const resultPromise = uploadStatementAction(buildFile());

    await vi.runAllTimersAsync();

    const result = await resultPromise;

    expect(result.errorMessage).toBe(STATEMENT_UPLOAD_MESSAGES.GENERIC_FAILURE);
    expect(result.latestTransactionMonthKey).toBeNull();
  });

  it("stops polling and returns the processing import once the timeout is reached", async () => {
    vi.spyOn(statementImportService, "upload").mockResolvedValue(buildImport());
    vi.spyOn(statementImportService, "getById").mockResolvedValue(
      buildImport(),
    );

    const resultPromise = uploadStatementAction(buildFile());

    await vi.runAllTimersAsync();

    const result = await resultPromise;

    expect(result.errorMessage).toBeNull();
    expect(result.statementImport?.status).toBe("PROCESSING");
  });

  it("returns the server message when the upload request itself is rejected", async () => {
    vi.spyOn(statementImportService, "upload").mockRejectedValue({
      response: { data: { message: "Missing required column" } },
    });

    const result = await uploadStatementAction(buildFile());

    expect(result.statementImport).toBeNull();
    expect(result.errorMessage).toBe("Missing required column");
  });
});
