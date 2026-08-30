import { describe, it, expect } from "vitest";
import { formatFileSize } from "./file.utility";

describe("file.utility", () => {
  it("floors a tiny file to 1KB", () => {
    expect(formatFileSize(10)).toBe("1KB");
  });

  it("rounds a whole number of kilobytes", () => {
    expect(formatFileSize(43008)).toBe("42KB");
  });

  it("formats megabytes with one decimal place", () => {
    expect(formatFileSize(3 * 1024 * 1024)).toBe("3.0MB");
  });

  it("formats a fractional megabyte size", () => {
    expect(formatFileSize(1.5 * 1024 * 1024)).toBe("1.5MB");
  });

  it("formats gigabytes with one decimal place", () => {
    expect(formatFileSize(2.25 * 1024 * 1024 * 1024)).toBe("2.3GB");
  });

  it("switches units exactly at the megabyte boundary", () => {
    expect(formatFileSize(1024 * 1024)).toBe("1.0MB");
    expect(formatFileSize(1024 * 1024 - 1)).toBe("1024KB");
  });
});
