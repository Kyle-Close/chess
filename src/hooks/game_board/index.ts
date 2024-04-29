import { useState } from 'react';
import { Pieces } from '../../enums/Pieces';
import { initialBoardState } from './InitialState';

export function useGameBoard() {
  const [board, setBoard] = useState<Pieces[]>(initialBoardState);

  return {
    board,
    setBoard,
  };
}
