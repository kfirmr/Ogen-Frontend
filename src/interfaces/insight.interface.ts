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
}

interface IInsightVendorSource {
  vendor: IVendorSummary | null;
}

export interface IInsightRecord {
  id: string;
  body: string;
  createdAt: string;
  type: TInsightType;
  status: TInsightStatusType;
  transaction?: IInsightVendorSource | null;
  subscription?: IInsightVendorSource | null;
}

export interface IGetInsightsRequest {
  batchSize?: number;
  status?: TInsightStatusType;
}
