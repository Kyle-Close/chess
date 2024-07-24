import { useEffect } from 'react';
import { PieceColor } from '../enums/PieceColor';
import { selectPlayerById, setColor, setIsInCheck, setName } from '../redux/slices/player';
import { useAppDispatch, useAppSelector } from './useBoard';
import { selectTimerById, setIsOn } from '../redux/slices/timer';

export interface UsePlayerReturn {
  updateName: (name: string) => void;
  updateIsInCheck: (isCheck: boolean) => void;
  updateColor: (color: PieceColor) => void;
}

interface UsePlayerProps {
  playerId: string;
}

export function usePlayer({ playerId }: UsePlayerProps): UsePlayerReturn {
  if (!playerId) return {} as UsePlayerReturn;
  const player = useAppSelector((state) => selectPlayerById(state, playerId));
  const timer = useAppSelector((state) => selectTimerById(state, player.timerId));
  const dispatch = useAppDispatch();

  const updateName = (name: string) => {
    dispatch(setName({ id: playerId, name }));
  };

  const updateColor = (color: PieceColor) => {
    dispatch(setColor({ id: playerId, color }));
  };

  const updateIsInCheck = (isInCheck: boolean) => {
    dispatch(setIsInCheck({ id: playerId, isInCheck }));
  };

  useEffect(() => {
    if (player.isTurn) dispatch(setIsOn({ id: timer.id, isOn: true }));
    else dispatch(setIsOn({ id: timer.id, isOn: false }));
  }, [player.isTurn]);

  return {
    updateName,
    updateIsInCheck,
    updateColor,
  };
}
