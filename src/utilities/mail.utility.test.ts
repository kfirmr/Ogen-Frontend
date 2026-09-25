import { describe, it, expect } from "vitest";
import { buildMailtoLink } from "./mail.utility";

describe("buildMailtoLink", () => {
  it("encodes the recipient, subject and body, keeping spaces and newlines readable", () => {
    const link = buildMailtoLink({
      subject: "ביטול מנוי",
      recipient: "support@example.com",
      body: "שלום,\nאבקש לבטל את המנוי שלי.",
    });

    expect(link).toBe(
      "mailto:support%40example.com?body=%D7%A9%D7%9C%D7%95%D7%9D%2C%0A%D7%90%D7%91%D7%A7%D7%A9%20%D7%9C%D7%91%D7%98%D7%9C%20%D7%90%D7%AA%20%D7%94%D7%9E%D7%A0%D7%95%D7%99%20%D7%A9%D7%9C%D7%99.&subject=%D7%91%D7%99%D7%98%D7%95%D7%9C%20%D7%9E%D7%A0%D7%95%D7%99",
    );
  });
});
