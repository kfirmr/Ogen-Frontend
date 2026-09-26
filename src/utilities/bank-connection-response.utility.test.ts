import { describe, it, expect } from "vitest";
import { isBankConnection } from "./bank-connection-response.utility";

const CONNECTION = {
  id: "b6f0c0de-0000-4000-8000-000000000002",
  company: "max",
  lastError: null,
  lastSyncedAt: null,
  otpRequestedAt: null,
  status: "PENDING_VALIDATION",
  createdAt: "2026-09-26T00:00:00.000Z",
};

describe("isBankConnection", () => {
  it("accepts a connection summary from the server", () => {
    expect(isBankConnection(CONNECTION)).toBe(true);
  });

  it("rejects an unknown status or company", () => {
    expect(isBankConnection({ ...CONNECTION, status: "DONE" })).toBe(false);
    expect(isBankConnection({ ...CONNECTION, company: "fakeBank" })).toBe(
      false,
    );
  });

  it("rejects a missing body", () => {
    expect(isBankConnection(null)).toBe(false);
  });
});
