import type { IVendorSummary } from "./vendor.interface";
import type { TDraftActionStatusType } from "../constants/draft-action.constants";

export interface IDraftActionRecord {
  id: string;
  body: string;
  subject: string;
  insightId: string;
  createdAt: string;
  reasoning: string | null;
  targetEmail: string | null;
  subscriptionId: string | null;
  vendor?: IVendorSummary | null;
  status: TDraftActionStatusType;
}

export interface IGetDraftActionsRequest {
  batchSize?: number;
  status?: TDraftActionStatusType;
}
