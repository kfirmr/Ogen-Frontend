import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "../store/auth.store";
import { levelService } from "../services/level.service";
import type { IUserProgress } from "../interfaces/level.interface";
import { USER_PROGRESS_QUERY_KEY } from "../constants/level.constants";

export const useUserProgress = (): IUserProgress | null => {
  const accessToken = useAccessToken();

  const { data } = useQuery({
    queryKey: USER_PROGRESS_QUERY_KEY,
    enabled: accessToken !== null,
    queryFn: () => levelService.getUserProgress(),
  });

  return data ?? null;
};
