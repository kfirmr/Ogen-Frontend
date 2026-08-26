import type { IUserProgress } from "../interfaces/level.interface";

const isNullableNumber = (value: unknown): boolean =>
  value === null || typeof value === "number";

const isNullableString = (value: unknown): boolean =>
  value === null || typeof value === "string";

export const isUserProgress = (value: unknown): value is IUserProgress => {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const progress = value as Record<string, unknown>;

  return (
    typeof progress.totalXp === "number" &&
    typeof progress.currentLevel === "number" &&
    typeof progress.xpToNextLevel === "number" &&
    typeof progress.currentLevelTitle === "string" &&
    isNullableString(progress.nextLevelTitle) &&
    isNullableNumber(progress.nextLevelNumber) &&
    isNullableNumber(progress.xpRequiredForNextLevel)
  );
};
