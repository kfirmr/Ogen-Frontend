import { useState } from "react";
import { useInterval } from "./interval.hook";

export const useNow = (tickMs: number | null): number => {
  const [now, setNow] = useState(() => Date.now());

  useInterval(() => setNow(Date.now()), tickMs);

  return now;
};
