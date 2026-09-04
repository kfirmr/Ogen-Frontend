import {
  INSIGHTS_QUERY_KEY,
  ACTIVE_INSIGHTS_REQUEST,
} from "../constants/insight.constants";

import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "../store/auth.store";
import { insightService } from "../services/insight.service";
import type { IInsightRecord } from "../interfaces/insight.interface";

const EMPTY_INSIGHTS: IInsightRecord[] = [];

export const useInsights = (): IInsightRecord[] => {
  const accessToken = useAccessToken();

  const { data } = useQuery({
    queryKey: INSIGHTS_QUERY_KEY,
    enabled: accessToken !== null,
    queryFn: () => insightService.getByUser(ACTIVE_INSIGHTS_REQUEST),
  });

  return data?.items ?? EMPTY_INSIGHTS;
};
