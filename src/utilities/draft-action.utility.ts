import type { IDraftActionRecord } from "../interfaces/draft-action.interface";

export const getDraftActionsByInsightId = (
  draftActions: IDraftActionRecord[],
): Map<string, IDraftActionRecord> =>
  new Map(
    draftActions.map((draftAction) => [draftAction.insightId, draftAction]),
  );
