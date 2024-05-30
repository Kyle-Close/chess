import { useContext } from 'react';
import { GameState } from '../context/GameState';
import { BoardContext } from '../context/board/BoardContext';

export function useSetupGame() {
  const gameState = useContext(GameState);
  const { board } = useContext(BoardContext);

  function setupFromFEN() {}

  return { setupFromFEN };
}
