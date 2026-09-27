import type {
  IBankConnection,
  IConnectBankRequest,
} from "../interfaces/bank-connection.interface";

import {
  isBankConnection,
  toBankConnections,
} from "../utilities/bank-connection-response.utility";

import { apiClient } from "./api-client";

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

  async getByUser(): Promise<IBankConnection[]> {
    const response = await apiClient.get<unknown>(
      BANK_CONNECTION_ENDPOINTS.BASE,
    );

    return toBankConnections(response.data);
  }

  async disconnect(id: string): Promise<void> {
    await apiClient.delete(`${BANK_CONNECTION_ENDPOINTS.BASE}/${id}`);
  }

  async getById(id: string): Promise<IBankConnection> {
    const response = await apiClient.get<unknown>(
      `${BANK_CONNECTION_ENDPOINTS.BASE}/${id}`,
    );

    return toBankConnection(response.data);
  }
}

export const bankConnectionService = new BankConnectionService();
