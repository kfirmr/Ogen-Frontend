import {
  DRAFT_ACTIONS_QUERY_KEY,
  PENDING_DRAFT_ACTIONS_REQUEST,
} from "../constants/draft-action.constants";

import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "../store/auth.store";
import { draftActionService } from "../services/draft-action.service";
import type { IDraftActionRecord } from "../interfaces/draft-action.interface";

const EMPTY_DRAFT_ACTIONS: IDraftActionRecord[] = [];

export const usePendingDraftActions = (): IDraftActionRecord[] => {
  const accessToken = useAccessToken();

  const { data } = useQuery({
    queryKey: DRAFT_ACTIONS_QUERY_KEY,
    enabled: accessToken !== null,
    queryFn: () => draftActionService.getByUser(PENDING_DRAFT_ACTIONS_REQUEST),
  });

  return data?.items ?? EMPTY_DRAFT_ACTIONS;
};
