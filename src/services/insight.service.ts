import type {
  IInsightRecord,
  IGetInsightsRequest,
} from "../interfaces/insight.interface";

import { apiClient } from "./api-client";
import type { IBatchResult } from "../interfaces/batch.interface";
import { toInsightBatch } from "../utilities/insight-response.utility";
import type { TInsightStatusType } from "../constants/insight.constants";

const INSIGHT_ENDPOINTS = {
  SEARCH: "/insight/search",
  STATUS: (id: string) => `/insight/${id}/status`,
} as const;

class InsightService {
  async getByUser(
    request: IGetInsightsRequest,
  ): Promise<IBatchResult<IInsightRecord>> {
    const response = await apiClient.post<unknown>(
      INSIGHT_ENDPOINTS.SEARCH,
      request,
    );

    return toInsightBatch(response.data);
  }

  async updateStatus(id: string, status: TInsightStatusType): Promise<void> {
    await apiClient.patch(INSIGHT_ENDPOINTS.STATUS(id), { status });
  }
}

export const insightService = new InsightService();
