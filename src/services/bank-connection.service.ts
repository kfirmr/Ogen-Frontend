import type {
  IBankConnection,
  IConnectBankRequest,
} from "../interfaces/bank-connection.interface";

import { apiClient } from "./api-client";
import { isBankConnection } from "../utilities/bank-connection-response.utility";

const BANK_CONNECTION_ENDPOINTS = {
  BASE: "/bank-connection",
} as const;

const toBankConnection = (data: unknown): IBankConnection => {
  if (!isBankConnection(data)) {
    throw new Error("Invalid bank connection response structure");
  }

  return data;
};

class BankConnectionService {
  async connect(request: IConnectBankRequest): Promise<IBankConnection> {
    const response = await apiClient.post<unknown>(
      BANK_CONNECTION_ENDPOINTS.BASE,
      request,
    );

    return toBankConnection(response.data);
  }

  async getById(id: string): Promise<IBankConnection> {
    const response = await apiClient.get<unknown>(
      `${BANK_CONNECTION_ENDPOINTS.BASE}/${id}`,
    );

    return toBankConnection(response.data);
  }
}

export const bankConnectionService = new BankConnectionService();
