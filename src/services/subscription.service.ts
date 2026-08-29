import type {
  ISubscription,
  IGetSubscriptionsRequest,
} from "../interfaces/subscription.interface";

import { apiClient } from "./api-client";
import type { IBatchResult } from "../interfaces/batch.interface";
import { toSubscriptionBatch } from "../utilities/subscription-response.utility";

const SUBSCRIPTION_ENDPOINTS = {
  SEARCH: "/subscription/search",
} as const;

class SubscriptionService {
  async getByUser(
    request: IGetSubscriptionsRequest,
  ): Promise<IBatchResult<ISubscription>> {
    const response = await apiClient.post<unknown>(
      SUBSCRIPTION_ENDPOINTS.SEARCH,
      request,
    );

    return toSubscriptionBatch(response.data);
  }
}

export const subscriptionService = new SubscriptionService();
