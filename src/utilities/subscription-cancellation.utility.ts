import {
  toSubscriptionView,
  getSubscriptionYearlyCostLabel,
} from "./subscription.utility";

import {
  CANCELLATION_LABELS,
  CANCELLATION_METHODS,
  CANCELLATION_CHANNELS,
  type TCancellationMethodType,
} from "../constants/subscription-cancellation.constants";

import type {
  ICancellationEmail,
  ICancellationChannel,
  ICancellationRequest,
  IFindCancellationRequestOptions,
} from "../interfaces/subscription-cancellation.interface";

import type { IVendorSummary } from "../interfaces/vendor.interface";
import type { ISubscription } from "../interfaces/subscription.interface";
import type { IDraftActionRecord } from "../interfaces/draft-action.interface";

const buildTemplateBody = (vendorName: string, subscriberName: string) =>
  [
    "שלום,",
    "",
    `אני מבקש/ת לבטל את המנוי שלי ל־${vendorName} החל מהיום, ולהפסיק כל חיוב עתידי.`,
    "",
    `שם המנוי: ${subscriberName}`,
    "",
    "אודה לאישור הביטול בחזרה למייל זה.",
    "",
    "תודה,",
    subscriberName,
  ].join("\n");

// The AI draft's address wins, then the address this user already sent to, then the inbox the
// vendor publishes; an empty recipient leaves the user to fill one in.
const getRecipient = (
  subscription: ISubscription,
  draftAction: IDraftActionRecord | null,
): string =>
  draftAction?.targetEmail ??
  subscription.cancellationEmail ??
  subscription.vendor?.cancellationEmail ??
  "";

const buildCancellationEmail = (
  subscription: ISubscription,
  draftAction: IDraftActionRecord | null,
  subscriberName: string,
): ICancellationEmail => {
  const vendorName = toSubscriptionView(subscription).name;
  const recipient = getRecipient(subscription, draftAction);

  if (draftAction !== null) {
    return { recipient, body: draftAction.body, subject: draftAction.subject };
  }

  return {
    recipient,
    body: buildTemplateBody(vendorName, subscriberName),
    subject: `${CANCELLATION_LABELS.SUBJECT_PREFIX} - ${vendorName}`,
  };
};

const toLinkChannel = (vendor: IVendorSummary): ICancellationChannel | null =>
  vendor.cancellationUrl == null
    ? null
    : { type: CANCELLATION_CHANNELS.LINK, target: vendor.cancellationUrl };

// Each method only yields a channel when the vendor detail it needs was actually found.
const CHANNEL_BY_METHOD: Record<
  TCancellationMethodType,
  (vendor: IVendorSummary) => ICancellationChannel | null
> = {
  [CANCELLATION_METHODS.EMAIL]: () => null,
  [CANCELLATION_METHODS.WEB]: toLinkChannel,
  [CANCELLATION_METHODS.IN_APP]: toLinkChannel,
  [CANCELLATION_METHODS.PHONE]: (vendor) =>
    vendor.cancellationPhone == null
      ? null
      : { type: CANCELLATION_CHANNELS.PHONE, target: vendor.cancellationPhone },
};

// A ready AI email always goes out by email; otherwise the vendor's own method decides, and
// email (possibly typed by the user) is the fallback whenever no other channel is known.
const resolveChannel = (
  subscription: ISubscription,
  email: ICancellationEmail,
  draftAction: IDraftActionRecord | null,
): ICancellationChannel => {
  const emailChannel = {
    target: email.recipient,
    type: CANCELLATION_CHANNELS.EMAIL,
  };
  const vendor = subscription.vendor ?? null;
  const method = vendor?.cancellationMethod ?? null;

  if (draftAction !== null || vendor === null || method === null) {
    return emailChannel;
  }

  return CHANNEL_BY_METHOD[method](vendor) ?? emailChannel;
};

export const findCancellationRequest = (
  options: IFindCancellationRequestOptions,
): ICancellationRequest | null => {
  const subscription =
    options.subscriptions.find(
      (candidate) => candidate.id === options.subscriptionId,
    ) ?? null;

  if (subscription === null) {
    return null;
  }

  const draftAction =
    options.pendingDraftActions.find(
      (candidate) => candidate.subscriptionId === subscription.id,
    ) ?? null;

  const email = buildCancellationEmail(
    subscription,
    draftAction,
    options.subscriberName,
  );

  return {
    email,
    draftAction,
    subscription: toSubscriptionView(subscription),
    yearlyCostLabel: getSubscriptionYearlyCostLabel(subscription),
    channel: resolveChannel(subscription, email, draftAction),
  };
};

export const getCancellationTitle = (vendorName: string): string =>
  `${CANCELLATION_LABELS.TITLE_PREFIX} ${vendorName}`;
