import { useEffect } from 'react';
import { useAppSelector } from './useBoard';
import { useDispatch } from 'react-redux';
import { setRemainingSeconds, toggleTimerIsOn } from '../redux/slices/timer';

export interface UseTimerReturn {
  start: () => void;
  stop: () => void;
  reset: (initialSeconds: number) => void;
  updateRemainingSeconds: (remainingSeconds: number) => void;
}

interface UseTimerProps {
  id: string;
}

export function useTimer({ id }: UseTimerProps): UseTimerReturn {
  const timer = useAppSelector((state) => state.timer);
  const dispatch = useDispatch();
  const thisTimer = timer.entities[id];

  const start = () => {
    if (!thisTimer.isOn) dispatch(toggleTimerIsOn({ id }));
  };

  const stop = () => {
    if (thisTimer.isOn) dispatch(toggleTimerIsOn({ id }));
  };

  const reset = (remainingSeconds: number) => {
    stop();
    dispatch(setRemainingSeconds({ id, remainingSeconds }));
  };

  const updateRemainingSeconds = (remainingSeconds: number) => {
    dispatch(setRemainingSeconds({ id, remainingSeconds }));
  };

  useEffect(() => {
    if (!thisTimer.isOn) return;

    const interval = window.setInterval(() => {
      dispatch(setRemainingSeconds({ id, remainingSeconds: thisTimer.remainingSeconds - 1 }));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [thisTimer.isOn]);

  return {
    start,
    stop,
    reset,
    updateRemainingSeconds,
  };
}
