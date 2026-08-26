import { apiClient } from "./api-client";
import type { IUserProgress } from "../interfaces/level.interface";
import { isUserProgress } from "../utilities/level-response.utility";

const LEVEL_ENDPOINTS = {
  USER_PROGRESS: "/level/me",
} as const;

class LevelService {
  async getUserProgress(): Promise<IUserProgress> {
    const response = await apiClient.get<unknown>(
      LEVEL_ENDPOINTS.USER_PROGRESS,
    );

    if (!isUserProgress(response.data)) {
      throw new Error("Invalid user progress response structure");
    }

    return response.data;
  }
}

export const levelService = new LevelService();
