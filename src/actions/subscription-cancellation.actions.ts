import {
  CANCELLATION_CHANNELS,
  type TCancellationChannelType,
} from "../constants/subscription-cancellation.constants";

import type {
  ICancellationEmail,
  ICancellationRequest,
} from "../interfaces/subscription-cancellation.interface";

import { approveDraftAction } from "./draft-action.actions";
import { subscriptionService } from "../services/subscription.service";
import { WebNavigationManager } from "../utilities/web-navigation.manager";

const OPEN_CHANNEL: Record<
  TCancellationChannelType,
  (target: string, email: ICancellationEmail) => void
> = {
  [CANCELLATION_CHANNELS.LINK]: (target) =>
    WebNavigationManager.openUrl(target),
  [CANCELLATION_CHANNELS.PHONE]: (target) => WebNavigationManager.dial(target),
  [CANCELLATION_CHANNELS.EMAIL]: (_target, email) =>
    WebNavigationManager.openMail(email),
};

// The backend has no mail sender yet, so the cancellation is handed to the user's own mail app,
// browser or phone only after the server has recorded the request and any AI draft behind it.
export const sendCancellationAction = async (
  request: ICancellationRequest,
  email: ICancellationEmail,
): Promise<void> => {
  const isEmailChannel = request.channel.type === CANCELLATION_CHANNELS.EMAIL;

  await subscriptionService.requestCancellation(
    request.subscription.id,
    isEmailChannel ? email.recipient : null,
  );

  if (request.draftAction !== null) {
    await approveDraftAction(request.draftAction);
  }

  OPEN_CHANNEL[request.channel.type](request.channel.target, email);
};
