import type {
  ISubscription,
  ISubscriptionView,
} from "./subscription.interface";

import type { IDraftActionRecord } from "./draft-action.interface";
import type { TCancellationChannelType } from "../constants/subscription-cancellation.constants";

export interface ICancellationEmail {
  body: string;
  subject: string;
  recipient: string;
}

// target is where the cancellation goes: the vendor's page, phone line or inbox.
export interface ICancellationChannel {
  target: string;
  type: TCancellationChannelType;
}

export interface ICancellationRequest {
  yearlyCostLabel: string;
  email: ICancellationEmail;
  channel: ICancellationChannel;
  subscription: ISubscriptionView;
  draftAction: IDraftActionRecord | null;
}

export interface IFindCancellationRequestOptions {
  subscriberName: string;
  subscriptionId: string | null;
  subscriptions: ISubscription[];
  pendingDraftActions: IDraftActionRecord[];
}
