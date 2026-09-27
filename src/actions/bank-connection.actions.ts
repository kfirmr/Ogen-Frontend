import {
  BANK_CONNECT_MESSAGES,
  CONNECTED_ACCOUNT_LABELS,
} from "../constants/bank-connection.constants";

import type {
  IBankConnection,
  IConnectBankRequest,
} from "../interfaces/bank-connection.interface";

import { bankConnectionService } from "../services/bank-connection.service";

export interface IConnectBankActionResult {
  errorMessage: string | null;
  connection: IBankConnection | null;
}

export const connectBankAction = async (
  request: IConnectBankRequest,
): Promise<IConnectBankActionResult> => {
  try {
    const connection = await bankConnectionService.connect(request);

    return { connection, errorMessage: null };
  } catch (error) {
    console.error("Failed to connect bank account", error);

    return {
      connection: null,
      errorMessage: BANK_CONNECT_MESSAGES.SEND_FAILED,
    };
  }
};

export const disconnectBankAction = async (
  connectionId: string,
): Promise<string | null> => {
  try {
    await bankConnectionService.disconnect(connectionId);

    return null;
  } catch (error) {
    console.error("Failed to disconnect bank account", error);

    return CONNECTED_ACCOUNT_LABELS.DISCONNECT_FAILED;
  }
};
