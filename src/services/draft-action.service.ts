import type {
  IDraftActionRecord,
  IGetDraftActionsRequest,
} from "../interfaces/draft-action.interface";

import { apiClient } from "./api-client";
import type { IBatchResult } from "../interfaces/batch.interface";
import { toDraftActionBatch } from "../utilities/draft-action-response.utility";
import type { TDraftActionStatusType } from "../constants/draft-action.constants";

const DRAFT_ACTION_ENDPOINTS = {
  SEARCH: "/draft-action/search",
  STATUS: (id: string) => `/draft-action/${id}/status`,
} as const;

class DraftActionService {
  async getByUser(
    request: IGetDraftActionsRequest,
  ): Promise<IBatchResult<IDraftActionRecord>> {
    const response = await apiClient.post<unknown>(
      DRAFT_ACTION_ENDPOINTS.SEARCH,
      request,
    );

    return toDraftActionBatch(response.data);
  }

  async updateStatus(
    id: string,
    status: TDraftActionStatusType,
  ): Promise<void> {
    await apiClient.patch(DRAFT_ACTION_ENDPOINTS.STATUS(id), { status });
  }
}

export const draftActionService = new DraftActionService();
