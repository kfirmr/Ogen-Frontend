import type {
  IBankConnection,
  IConnectBankRequest,
} from "../interfaces/bank-connection.interface";

import { bankConnectionService } from "../services/bank-connection.service";
import { BANK_CONNECT_MESSAGES } from "../constants/bank-connection.constants";

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
