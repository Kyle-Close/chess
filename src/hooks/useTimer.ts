import { useEffect, useState } from 'react';

export function useTimer(initialSeconds: number, isStart: boolean) {
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
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isOn, setIsOn]);

  return {
    start,
    stop,
    reset,
    remainingSeconds,
  };
}
