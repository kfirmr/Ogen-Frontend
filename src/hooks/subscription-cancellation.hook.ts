import { useState } from "react";
import { useCurrentUser } from "../store/auth.store";
import { useQueryClient } from "@tanstack/react-query";
import { useSubscriptions } from "./subscriptions.hook";
import { usePendingDraftActions } from "./draft-actions.hook";
import { INSIGHTS_QUERY_KEY } from "../constants/insight.constants";
import { USER_PROGRESS_QUERY_KEY } from "../constants/level.constants";
import { DRAFT_ACTIONS_QUERY_KEY } from "../constants/draft-action.constants";
import { SUBSCRIPTIONS_QUERY_KEY } from "../constants/subscription.constants";
import { sendCancellationAction } from "../actions/subscription-cancellation.actions";
import { findCancellationRequest } from "../utilities/subscription-cancellation.utility";
import type { ICancellationEmail } from "../interfaces/subscription-cancellation.interface";

// The cancellation contact is looked up after the import completes, so the copy cached when the
// import finished can predate it; these are fetched fresh before the popup is built.
const CANCELLATION_SOURCE_QUERY_KEYS = [
  DRAFT_ACTIONS_QUERY_KEY,
  SUBSCRIPTIONS_QUERY_KEY,
];

const CANCELLATION_QUERY_KEYS = [
  INSIGHTS_QUERY_KEY,
  DRAFT_ACTIONS_QUERY_KEY,
  SUBSCRIPTIONS_QUERY_KEY,
  USER_PROGRESS_QUERY_KEY,
];

export const useSubscriptionCancellation = () => {
  const queryClient = useQueryClient();
  const user = useCurrentUser();
  const subscriptions = useSubscriptions();
  const pendingDraftActions = usePendingDraftActions();
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [openingSubscriptionId, setOpeningSubscriptionId] = useState<
    string | null
  >(null);

  const request = findCancellationRequest({
    subscriptions,
    subscriptionId,
    pendingDraftActions,
    subscriberName: user?.fullName ?? "",
  });

  const send = async (email: ICancellationEmail) => {
    if (request === null) {
      return;
    }

    try {
      await sendCancellationAction(request, email);
      await Promise.all(
        CANCELLATION_QUERY_KEYS.map((queryKey) =>
          queryClient.invalidateQueries({ queryKey }),
        ),
      );
    } catch (error) {
      console.error("Failed to send subscription cancellation", error);
    }
  };

  const open = async (id: string) => {
    setOpeningSubscriptionId(id);

    try {
      await Promise.all(
        CANCELLATION_SOURCE_QUERY_KEYS.map((queryKey) =>
          queryClient.refetchQueries({ queryKey }),
        ),
      );
      setSubscriptionId(id);
    } finally {
      setOpeningSubscriptionId(null);
    }
  };

  return {
    open,
    send,
    request,
    openingSubscriptionId,
    close: () => setSubscriptionId(null),
  };
};
