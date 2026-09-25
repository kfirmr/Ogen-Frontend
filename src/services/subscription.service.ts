import type {
  ISubscription,
  IGetSubscriptionsRequest,
} from "../interfaces/subscription.interface";

import { apiClient } from "./api-client";
import type { IBatchResult } from "../interfaces/batch.interface";
import { toSubscriptionBatch } from "../utilities/subscription-response.utility";

const SUBSCRIPTION_ENDPOINTS = {
  SEARCH: "/subscription/search",
  REQUEST_CANCELLATION: (id: string) =>
    `/subscription/${id}/request-cancellation`,
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

  async requestCancellation(
    id: string,
    cancellationEmail: string | null,
  ): Promise<void> {
    await apiClient.post(SUBSCRIPTION_ENDPOINTS.REQUEST_CANCELLATION(id), {
      cancellationEmail,
    });
  }
}

export const subscriptionService = new SubscriptionService();
