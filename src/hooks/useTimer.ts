import { useEffect } from 'react';
import { useAppSelector } from './useBoard';
import { useDispatch } from 'react-redux';
import {
  decrementRemainingSeconds,
  selectTimerById,
  setIsOn,
  setRemainingSeconds,
} from '../redux/slices/timer';
import { PieceColor } from '../enums/PieceColor';
import { MatchResult, setMatchResult } from '../redux/slices/gameInfo';

export interface UseTimerReturn {
  start: () => void;
  stop: () => void;
  reset: (initialSeconds: number) => void;
  updateRemainingSeconds: (remainingSeconds: number) => void;
  remainingSeconds: number;
}

interface UseTimerProps {
  id: string;
  color: PieceColor;
}

export function useTimer({ id, color }: UseTimerProps): UseTimerReturn {
  const timer = useAppSelector((state) => selectTimerById(state, id));
  const dispatch = useDispatch();

  const start = () => {
    dispatch(setIsOn({ id, isOn: true }));
  };

  const stop = () => {
    dispatch(setIsOn({ id, isOn: false }));
  };

  const reset = (remainingSeconds: number) => {
    stop();
    dispatch(setRemainingSeconds({ id, remainingSeconds }));
  };

  const updateRemainingSeconds = (remainingSeconds: number) => {
    dispatch(setRemainingSeconds({ id, remainingSeconds }));
  };

  function handleTimerComplete() {
    const winner = color === PieceColor.WHITE ? MatchResult.BLACK_WIN : MatchResult.WHITE_WIN;
    dispatch(setMatchResult(winner));
  }

  useEffect(() => {
    if (!timer.isOn) return;

    const interval = window.setInterval(() => {
      dispatch(decrementRemainingSeconds({ id }));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [timer.isOn]);

  useEffect(() => {
    if (timer.remainingSeconds === 0) {
      handleTimerComplete();
      dispatch(setIsOn({ id: timer.id, isOn: false }));
    }
  }, [timer.remainingSeconds]);

  return {
    start,
    stop,
    reset,
    updateRemainingSeconds,
    remainingSeconds: timer.remainingSeconds,
  };
}
