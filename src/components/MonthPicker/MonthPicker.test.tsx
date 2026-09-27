import MonthPicker from "./MonthPicker";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { getRecentMonths } from "../../utilities/date.utility";
import { MONTHS_TO_SHOW } from "../../constants/date.constants";

const FROM = new Date("2026-09-27T12:00:00.000Z");

describe("MonthPicker", () => {
  it("offers a full year of months, newest first", () => {
    const months = getRecentMonths({ count: MONTHS_TO_SHOW, from: FROM });

    render(
      <MonthPicker months={months} onChange={vi.fn()} value={months[11].key} />,
    );

    const labels = screen
      .getAllByRole("button")
      .map((button) => button.textContent);

    expect(labels).toHaveLength(12);
    expect(labels[0]).toBe("ספט26");
    expect(labels[11]).toBe("אוק25");
  });

  it("selects a month from more than five months ago", async () => {
    const onChange = vi.fn();
    const months = getRecentMonths({ count: MONTHS_TO_SHOW, from: FROM });

    render(
      <MonthPicker
        months={months}
        onChange={onChange}
        value={months[11].key}
      />,
    );

    await userEvent.click(screen.getByText("אוק"));

    expect(onChange).toHaveBeenCalledWith("2025-10");
  });
});
