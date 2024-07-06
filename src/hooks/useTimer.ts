import { useEffect, useState } from 'react';

export interface UseTimerReturn {
  start: () => void;
  stop: () => void;
  reset: (initialSeconds: number) => void;
  remainingSeconds: number;
  isTimeOut: boolean;
}

export function useTimer(initialSeconds: number, isStart: boolean, onComplete: () => void) {
  const [isOn, setIsOn] = useState(isStart);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

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

  useEffect(() => {
    console.log(isOn);
    if (!isOn) return;

    const interval = window.setInterval(() => {
      setRemainingSeconds((prevRemainingSeconds) => prevRemainingSeconds - 1);
      if (remainingSeconds - 1 <= 0) {
        onComplete();
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isOn, setIsOn]);

  const isTimeOut = remainingSeconds <= 0;

  return {
    start,
    stop,
    reset,
    remainingSeconds,
    isTimeOut,
  };
}
