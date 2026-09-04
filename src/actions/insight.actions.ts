import { insightService } from "../services/insight.service";
import { INSIGHT_STATUSES } from "../constants/insight.constants";

export const dismissInsightAction = (id: string): Promise<void> =>
  insightService.updateStatus(id, INSIGHT_STATUSES.ACTION_TAKEN);
