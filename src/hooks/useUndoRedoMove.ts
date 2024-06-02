import { useContext } from 'react';
import { GameState } from '../context/GameState';
import { useSetupGame } from './useSetupGame';

export function useUndoRedoMove() {
  const gameState = useContext(GameState);
  const { setupFromFEN } = useSetupGame();

  const undo = () => {
    const moveHistory = gameState.moveHistory;
    if (moveHistory.length > 1) {
      const lastMove = moveHistory[moveHistory.length - 2];
      if (!lastMove) return;

      gameState.popMoveHistory();
      setupFromFEN(lastMove.fenString);
    }
  };

  const redo = () => {
    const redoMoveHistory = gameState.moveHistoryRedo;
    if (redoMoveHistory.length > 0) {
      const lastRedo = redoMoveHistory.pop();
      if (lastRedo) {
        gameState.pushToMoveHistory(lastRedo);
        setupFromFEN(lastRedo.fenString);
      }
    }
  };

  return { undo, redo };
}
