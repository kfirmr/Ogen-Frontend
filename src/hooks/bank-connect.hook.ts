import {
  useQuery,
  skipToken,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";

import {
  TRANSACTIONS_QUERY_KEY,
  TRANSACTION_SUMMARY_QUERY_KEY,
} from "../constants/transaction.constants";

import {
  connectBankAction,
  disconnectBankAction,
} from "../actions/bank-connection.actions";

import {
  getElapsedMs,
  findBankCompany,
  isValidationSlow,
  formatElapsedTime,
  findConnectedAccount,
  isConnectStepSettled,
  resolveConnectOutcome,
  toConnectedAccountView,
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
  BANK_CONNECTIONS_LIST_QUERY_KEY,
} from "../constants/bank-connection.constants";

import type {
  IBankConnection,
  TBankCredentials,
} from "../interfaces/bank-connection.interface";

import { useState } from "react";
import { useNow } from "./now.hook";
import { useAccessToken } from "../store/auth.store";
import { INSIGHTS_QUERY_KEY } from "../constants/insight.constants";
import { USER_PROGRESS_QUERY_KEY } from "../constants/level.constants";
import { bankConnectionService } from "../services/bank-connection.service";
import { SUBSCRIPTIONS_QUERY_KEY } from "../constants/subscription.constants";

interface IBankConnectState {
  isSubmitting: boolean;
  isDisconnecting: boolean;
  startedAt: number | null;
  step: TBankConnectStepType;
  errorMessage: string | null;
  connectionId: string | null;
  credentials: TBankCredentials;
  companyId: TBankCompanyIdType;
  disconnectError: string | null;
}

const INITIAL_STATE: IBankConnectState = {
  credentials: {},
  startedAt: null,
  errorMessage: null,
  isSubmitting: false,
  connectionId: null,
  disconnectError: null,
  isDisconnecting: false,
  step: BANK_CONNECT_STEPS.PICK,
  companyId: BANK_COMPANIES[0].id,
};

// A new connection imports its history in the background, which feeds every financial view.
const CONNECTED_ACCOUNT_QUERY_KEYS = [
  INSIGHTS_QUERY_KEY,
  BANK_CONNECTIONS_LIST_QUERY_KEY,
  TRANSACTIONS_QUERY_KEY,
  SUBSCRIPTIONS_QUERY_KEY,
  TRANSACTION_SUMMARY_QUERY_KEY,
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
  const accessToken = useAccessToken();
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

  const { data: connections, isPending: isLoadingConnections } = useQuery({
    enabled: accessToken !== null,
    queryKey: BANK_CONNECTIONS_LIST_QUERY_KEY,
    queryFn: () => bankConnectionService.getByUser(),
  });

  const savedAccount = findConnectedAccount(connections ?? []);
  const isIdle = state.step === BANK_CONNECT_STEPS.PICK;
  const connectOutcome = isValidating
    ? resolveConnectOutcome(connection?.status ?? null, company)
    : { step: state.step, errorMessage: state.errorMessage };
  const isJustConnected = connectOutcome.step === BANK_CONNECT_STEPS.ACTIVE;
  const showsSavedAccount = isIdle && savedAccount !== null;
  // Until the saved connections load, the picker would flash before a connected account replaces it.
  const isResolvingSavedAccount =
    isIdle && accessToken !== null && isLoadingConnections;
  const outcome = showsSavedAccount
    ? { step: BANK_CONNECT_STEPS.ACTIVE, errorMessage: null }
    : connectOutcome;
  const account = isJustConnected ? (connection ?? null) : savedAccount;
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

  // Disconnecting deletes the account's transactions and subscriptions, so every financial view is
  // refetched, and the list before the picker returns so the removed account never flashes back.
  const disconnect = async () => {
    if (account === null || state.isDisconnecting) {
      return;
    }

    setState((current) => ({
      ...current,
      disconnectError: null,
      isDisconnecting: true,
    }));

    const disconnectError = await disconnectBankAction(account.id);

    if (disconnectError !== null) {
      setState((current) => ({
        ...current,
        disconnectError,
        isDisconnecting: false,
      }));

      return;
    }

    await refreshConnectedAccountData(queryClient);
    setState(INITIAL_STATE);
  };

  const clearDisconnectError = () =>
    setState((current) => ({ ...current, disconnectError: null }));

  return {
    company,
    step: outcome.step,
    credentials: state.credentials,
    isJustConnected,
    isResolvingSavedAccount,
    isSubmitting: state.isSubmitting,
    isDisconnecting: state.isDisconnecting,
    disconnectError: state.disconnectError,
    accountView: account === null ? null : toConnectedAccountView(account),
    errorMessage: outcome.errorMessage,
    elapsedLabel: formatElapsedTime(elapsedMs),
    isSlow: isValidationSlow(elapsedMs),
    canConnect: areCredentialsComplete(company, state.credentials),
    retry,
    connect,
    disconnect,
    pickAnother,
    clearDisconnectError,
    pickCompany,
    changeCredential,
  };
};
