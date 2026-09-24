import type {
  TInsightType,
  TInsightTone,
  TInsightStatusType,
} from "../constants/insight.constants";

import type { ReactNode } from "react";
import type { IVendorSummary } from "./vendor.interface";

export type { TInsightTone } from "../constants/insight.constants";

export interface IInsight {
  id: string;
  body: string;
  title: string;
  xpLabel: string;
  icon: ReactNode;
  tone: TInsightTone;
  savingsLabel: string | null;
}

interface IInsightVendorSource {
  vendor: IVendorSummary | null;
}

// The backend writes a different set of detection facts per insight type, so every key is optional
// here rather than split into a union the server never tags.
export interface IInsightMetadata {
  amount?: string;
  vendorId?: string;
  vendorName?: string;
  serviceType?: string;
  userAverage?: string;
  vendorNames?: string[];
  vendorAverage?: string;
  subscriptionIds?: string[];
  averageMarketPrice?: string;
}

export interface IInsightRecord {
  id: string;
  body: string;
  createdAt: string;
  type: TInsightType;
  status: TInsightStatusType;
  metadata?: IInsightMetadata;
  estimatedMonthlySavings?: string | null;
  transaction?: IInsightVendorSource | null;
  subscription?: IInsightVendorSource | null;
}

export interface IGetInsightsRequest {
  batchSize?: number;
  status?: TInsightStatusType;
}
