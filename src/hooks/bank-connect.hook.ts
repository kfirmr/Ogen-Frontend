import {
  useQuery,
  skipToken,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";

import {
  getElapsedMs,
  findBankCompany,
  isValidationSlow,
  formatElapsedTime,
  isConnectStepSettled,
  resolveConnectOutcome,
  areCredentialsComplete,
  sanitizeCredentialInput,
} from "../utilities/bank-connection.utility";

import {
  BANK_COMPANIES,
  BANK_CONNECT_STEPS,
  BANK_CONNECTION_POLLING,
  type TBankCompanyIdType,
  BANK_CONNECTION_STATUSES,
  BANK_CONNECTION_QUERY_KEY,
  type TBankConnectStepType,
  type TBankCredentialFieldType,
} from "../constants/bank-connection.constants";

import type {
  IBankConnection,
  TBankCredentials,
} from "../interfaces/bank-connection.interface";

import { useState } from "react";
import { useNow } from "./now.hook";
import { INSIGHTS_QUERY_KEY } from "../constants/insight.constants";
import { USER_PROGRESS_QUERY_KEY } from "../constants/level.constants";
import { connectBankAction } from "../actions/bank-connection.actions";
import { bankConnectionService } from "../services/bank-connection.service";
import { TRANSACTIONS_QUERY_KEY } from "../constants/transaction.constants";
import { SUBSCRIPTIONS_QUERY_KEY } from "../constants/subscription.constants";

interface IBankConnectState {
  isSubmitting: boolean;
  startedAt: number | null;
  step: TBankConnectStepType;
  errorMessage: string | null;
  connectionId: string | null;
  credentials: TBankCredentials;
  companyId: TBankCompanyIdType;
}

const INITIAL_STATE: IBankConnectState = {
  credentials: {},
  startedAt: null,
  errorMessage: null,
  isSubmitting: false,
  connectionId: null,
  step: BANK_CONNECT_STEPS.PICK,
  companyId: BANK_COMPANIES[0].id,
};

// A new connection imports its history in the background, which feeds every financial view.
const CONNECTED_ACCOUNT_QUERY_KEYS = [
  INSIGHTS_QUERY_KEY,
  TRANSACTIONS_QUERY_KEY,
  SUBSCRIPTIONS_QUERY_KEY,
  USER_PROGRESS_QUERY_KEY,
];

const toConnectionQueryKey = (connectionId: string | null) => [
  ...BANK_CONNECTION_QUERY_KEY,
  connectionId,
];

const refreshConnectedAccountData = (queryClient: QueryClient) =>
  Promise.all(
    CONNECTED_ACCOUNT_QUERY_KEYS.map((queryKey) =>
      queryClient.invalidateQueries({ queryKey }),
    ),
  );

// Polled until the worker settles the login; the moment it turns ACTIVE, the financial views are
// refreshed so the imported history shows up without a reload.
const fetchConnectionStatus = async (
  connectionId: string,
  queryClient: QueryClient,
): Promise<IBankConnection> => {
  const connection = await bankConnectionService.getById(connectionId);

  if (connection.status === BANK_CONNECTION_STATUSES.ACTIVE) {
    await refreshConnectedAccountData(queryClient);
  }

  return connection;
};

export const useBankConnect = () => {
  const queryClient = useQueryClient();
  const [state, setState] = useState<IBankConnectState>(INITIAL_STATE);

  const company = findBankCompany(state.companyId);
  const connectionId = state.connectionId;
  const isValidating = state.step === BANK_CONNECT_STEPS.VALIDATING;
  const now = useNow(
    isValidating ? BANK_CONNECTION_POLLING.ELAPSED_TICK_MS : null,
  );

  const { data: connection } = useQuery({
    enabled: isValidating,
    queryKey: toConnectionQueryKey(connectionId),
    queryFn:
      connectionId === null
        ? skipToken
        : () => fetchConnectionStatus(connectionId, queryClient),
    refetchInterval: (query) => {
      const polledStatus = query.state.data?.status ?? null;
      const polledStep = resolveConnectOutcome(polledStatus, company).step;

      return isConnectStepSettled(polledStep)
        ? false
        : BANK_CONNECTION_POLLING.INTERVAL_MS;
    },
  });

  const outcome = isValidating
    ? resolveConnectOutcome(connection?.status ?? null, company)
    : { step: state.step, errorMessage: state.errorMessage };
  const elapsedMs = getElapsedMs(state.startedAt, now);

  const pickCompany = (companyId: TBankCompanyIdType) =>
    setState({ ...INITIAL_STATE, companyId, step: BANK_CONNECT_STEPS.LOGIN });

  const changeCredential = (field: TBankCredentialFieldType, value: string) =>
    setState((current) => ({
      ...current,
      errorMessage: null,
      step: BANK_CONNECT_STEPS.LOGIN,
      credentials: {
        ...current.credentials,
        [field]: sanitizeCredentialInput(field, value),
      },
    }));

  const connect = async () => {
    if (!areCredentialsComplete(company, state.credentials)) {
      return;
    }

    setState((current) => ({ ...current, isSubmitting: true }));

    const { connection: startedConnection, errorMessage } =
      await connectBankAction({
        company: company.id,
        credentials: state.credentials,
      });

    if (startedConnection === null) {
      setState((current) => ({
        ...current,
        isSubmitting: false,
        step: BANK_CONNECT_STEPS.LOGIN,
        errorMessage,
      }));

      return;
    }

    // Re-entering a login for the same company reuses its connection id, so the cached status
    // from the previous attempt is replaced before polling starts.
    queryClient.setQueryData(
      toConnectionQueryKey(startedConnection.id),
      startedConnection,
    );
    setState((current) => ({
      ...current,
      errorMessage: null,
      isSubmitting: false,
      startedAt: Date.now(),
      step: BANK_CONNECT_STEPS.VALIDATING,
      connectionId: startedConnection.id,
    }));
  };

  const retry = () =>
    setState((current) => ({
      ...current,
      errorMessage: null,
      step: BANK_CONNECT_STEPS.LOGIN,
      credentials: { ...current.credentials, password: "" },
    }));

  const pickAnother = () => setState(INITIAL_STATE);

  return {
    company,
    step: outcome.step,
    credentials: state.credentials,
    isSubmitting: state.isSubmitting,
    errorMessage: outcome.errorMessage,
    elapsedLabel: formatElapsedTime(elapsedMs),
    isSlow: isValidationSlow(elapsedMs),
    canConnect: areCredentialsComplete(company, state.credentials),
    retry,
    connect,
    pickAnother,
    pickCompany,
    changeCredential,
  };
};
