import { useEffect } from 'react';
import { Player, selectPlayerById, setColor, setIsAi, setIsInCheck, setName } from '../../../redux/slices/player';
import { useAppDispatch, useAppSelector } from '../../game-board/hooks/useBoard';
import { setIsOn } from '../../../redux/slices/timer';
import { PieceColor } from 'base/features/game-board/hooks/usePiece';

export interface UsePlayerReturn extends Player {
  updateName: (name: string) => void;
  updateIsInCheck: (isCheck: boolean) => void;
  updateColor: (color: PieceColor) => void;
  updateIsAi: (isAi: boolean) => void;
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

  const updateIsAi = (isAi: boolean) => {
    dispatch(setIsAi({ id: playerId, value: isAi }))
  }

  useEffect(() => {
    if (!gameInfo.isPlaying) {
      dispatch(setIsOn({ id: player.timerId, isOn: false }));
      return;
    }
    if (player.isTurn) dispatch(setIsOn({ id: player.timerId, isOn: true }));
    else dispatch(setIsOn({ id: player.timerId, isOn: false }));
  }, [player.isTurn]);

  return {
    updateName,
    updateIsInCheck,
    updateColor,
    updateIsAi,
    stopTimer,
    ...player,
  };
}
