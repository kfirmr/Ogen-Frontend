import type { ICancellationEmail } from "../interfaces/subscription-cancellation.interface";

export const buildMailtoLink = (email: ICancellationEmail): string => {
  const recipient = encodeURIComponent(email.recipient);
  const query = new URLSearchParams({
    body: email.body,
    subject: email.subject,
  });

  // URLSearchParams encodes spaces as "+", which mail clients show literally inside a mailto body.
  return `mailto:${recipient}?${query.toString().replaceAll("+", "%20")}`;
};
