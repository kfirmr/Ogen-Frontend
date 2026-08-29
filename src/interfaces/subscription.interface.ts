import type {
  TBillingCycleType,
  TSubscriptionStatusType,
} from "../constants/subscription.constants";

import type { IVendorSummary } from "./vendor.interface";

export interface ISubscription {
  id: string;
  amount: string;
  currency: string;
  vendor: IVendorSummary | null;
  nextChargeDate: string | null;
  status: TSubscriptionStatusType;
  billingCycle: TBillingCycleType;
}

export interface ISubscriptionView {
  id: string;
  icon: string;
  name: string;
  price: string;
}

export interface IGetSubscriptionsRequest {
  batchSize?: number;
  status?: TSubscriptionStatusType;
}
