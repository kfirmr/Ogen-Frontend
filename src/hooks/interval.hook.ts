import { useRef, useEffect } from "react";

// A null delay pauses the interval; the latest callback always runs without restarting the timer.
export const useInterval = (callback: () => void, delayMs: number | null) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delayMs === null) {
      return;
    }

    const intervalId = setInterval(() => callbackRef.current(), delayMs);

    return () => clearInterval(intervalId);
  }, [delayMs]);
};
