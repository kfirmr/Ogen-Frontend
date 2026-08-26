import {
  LEVEL_LABELS,
  MAX_PROGRESS_PERCENT,
} from "../constants/level.constants";

import type { IUserProgress } from "../interfaces/level.interface";

export const getLevelHeadline = (progress: IUserProgress | null): string => {
  if (progress === null) {
    return LEVEL_LABELS.EMPTY;
  }

  return `רמה ${progress.currentLevel} · ${progress.currentLevelTitle}`;
};

export const getLevelXpLabel = (progress: IUserProgress | null): string => {
  if (progress === null) {
    return LEVEL_LABELS.EMPTY;
  }

  return `רמה ${progress.currentLevel} · ${progress.totalXp} XP`;
};

export const getLevelCaption = (progress: IUserProgress | null): string => {
  if (progress === null) {
    return LEVEL_LABELS.LOADING_CAPTION;
  }

  if (progress.nextLevelTitle === null) {
    return LEVEL_LABELS.MAX_LEVEL_CAPTION;
  }

  return `עוד ${progress.xpToNextLevel} XP כדי להגיע לדרגת ${progress.nextLevelTitle}`;
};

export const getLevelProgressPercent = (
  progress: IUserProgress | null,
): number => {
  if (progress === null) {
    return 0;
  }

  if (progress.xpRequiredForNextLevel === null) {
    return MAX_PROGRESS_PERCENT;
  }

  const earnedShare = progress.totalXp / progress.xpRequiredForNextLevel;

  return Math.min(
    Math.round(earnedShare * MAX_PROGRESS_PERCENT),
    MAX_PROGRESS_PERCENT,
  );
};
