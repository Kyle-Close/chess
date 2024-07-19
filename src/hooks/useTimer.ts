import { useEffect, useState } from 'react';

export interface UseTimerReturn {
  start: () => void;
  stop: () => void;
  reset: (initialSeconds: number) => void;
  remainingSeconds: number;
  updateRemainingSeconds: (remainingSeconds: number) => void;
}

export function useTimer(isStart: boolean): UseTimerReturn {
  const [isOn, setIsOn] = useState(isStart);
  const [remainingSeconds, setRemainingSeconds] = useState(99999);

  const start = () => {
    setIsOn(true);
  };

  const stop = () => {
    setIsOn(false);
  };

  const reset = (initialSeconds: number) => {
    setIsOn(false);
    setRemainingSeconds(initialSeconds);
  };

  const updateRemainingSeconds = (remainingSeconds: number) => {
    setRemainingSeconds(remainingSeconds);
  };

  useEffect(() => {
    console.log(isOn);
    if (!isOn) return;

    const interval = window.setInterval(() => {
      setRemainingSeconds((prevRemainingSeconds) => prevRemainingSeconds - 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isOn, setIsOn]);

  return {
    start,
    stop,
    reset,
    remainingSeconds,
    updateRemainingSeconds,
  };
}
