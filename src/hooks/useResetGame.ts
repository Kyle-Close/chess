import { useContext } from 'react';
import { GameState } from '../context/game-state/GameState';
import { useBoard } from './useBoard';

export function useResetGame() {
  const { resetBoard } = useBoard();
  const gameState = useContext(GameState);

  function resetGame() {
    resetBoard();
    gameState.reset();
  }

  return { resetGame };
}
