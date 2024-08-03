import { useEffect } from 'react';
import { PieceColor } from '../enums/PieceColor';
import { Player, selectPlayerById, setColor, setIsInCheck, setName } from '../redux/slices/player';
import { useAppDispatch, useAppSelector } from './useBoard';
import { setIsOn } from '../redux/slices/timer';

export interface UsePlayerReturn extends Player {
  updateName: (name: string) => void;
  updateIsInCheck: (isCheck: boolean) => void;
  updateColor: (color: PieceColor) => void;
  stopTimer: () => void;
}

interface UsePlayerProps {
  playerId: string;
}

export function usePlayer({ playerId }: UsePlayerProps): UsePlayerReturn {
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const player = useAppSelector((state) => selectPlayerById(state, playerId));
  const dispatch = useAppDispatch();

  const stopTimer = () => {
    dispatch(setIsOn({ id: player.timerId, isOn: false }));
  };

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
    if (!gameInfo.isPlaying) return;
    if (player.isTurn) dispatch(setIsOn({ id: player.timerId, isOn: true }));
    else dispatch(setIsOn({ id: player.timerId, isOn: false }));
  }, [player.isTurn]);

  return {
    updateName,
    updateIsInCheck,
    updateColor,
    stopTimer,
    ...player,
  };
}
