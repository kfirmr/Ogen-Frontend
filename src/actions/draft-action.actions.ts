import { dismissInsightAction } from "./insight.actions";
import { draftActionService } from "../services/draft-action.service";
import { DRAFT_ACTION_STATUSES } from "../constants/draft-action.constants";
import type { IDraftActionRecord } from "../interfaces/draft-action.interface";

export const approveDraftAction = async (
  draftAction: IDraftActionRecord,
): Promise<void> => {
  await draftActionService.updateStatus(
    draftAction.id,
    DRAFT_ACTION_STATUSES.APPROVED,
  );
  await dismissInsightAction(draftAction.insightId);
};
