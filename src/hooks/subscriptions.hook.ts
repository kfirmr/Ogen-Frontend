import {
  SUBSCRIPTIONS_QUERY_KEY,
  ACTIVE_SUBSCRIPTIONS_REQUEST,
} from "../constants/subscription.constants";

import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "../store/auth.store";
import { subscriptionService } from "../services/subscription.service";
import type { ISubscription } from "../interfaces/subscription.interface";

const EMPTY_SUBSCRIPTIONS: ISubscription[] = [];

export const useSubscriptions = (): ISubscription[] => {
  const accessToken = useAccessToken();

  const { data } = useQuery({
    queryKey: SUBSCRIPTIONS_QUERY_KEY,
    enabled: accessToken !== null,
    queryFn: () => subscriptionService.getByUser(ACTIVE_SUBSCRIPTIONS_REQUEST),
  });

  return data?.items ?? EMPTY_SUBSCRIPTIONS;
};
