import type { TCancellationMethodType } from "../constants/subscription-cancellation.constants";

export interface IVendorSummary {
  id: string;
  name: string;
  category: string | null;
  cancellationUrl?: string | null;
  cancellationEmail?: string | null;
  cancellationPhone?: string | null;
  cancellationMethod?: TCancellationMethodType | null;
}
