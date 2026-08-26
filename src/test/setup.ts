import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { vi, afterEach, beforeEach } from "vitest";

// jsdom has no canvas, and the Lottie player paints on mount.
vi.mock("lottie-react", () => ({ Lottie: () => null, default: () => null }));

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  cleanup();
});
