import { useSetupGame } from './useSetupGame';
import { useAppSelector } from './useBoard';
import { useDispatch } from 'react-redux';
import {
  popMoveHistory,
  popMoveHistoryRedo,
  pushToMoveHistory,
  pushToMoveHistoryRedo,
} from '../redux/slices/gameInfo';
import { DEFAULT_FEN_STRING } from '../constants/defaultFen';

export function useUndoRedoMove() {
  const dispatch = useDispatch();
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const { setupFromFEN } = useSetupGame();

  const undo = () => {
    const moveHistory = gameInfo.moveHistory;
    if (moveHistory.length >= 2) {
      const lastMove = moveHistory[moveHistory.length - 2];
      if (!lastMove) return;

      const popped = gameInfo.moveHistory[moveHistory.length - 1];
      dispatch(popMoveHistory());
      dispatch(pushToMoveHistoryRedo(popped));
      setupFromFEN(lastMove.fenString);
    } else if (moveHistory.length === 1) {
      // Handle case when we want to roll back first move
      const popped = gameInfo.moveHistory[moveHistory.length - 1];
      dispatch(pushToMoveHistoryRedo(popped));
      dispatch(popMoveHistory());

      setupFromFEN(DEFAULT_FEN_STRING);
    }
  };

  const redo = () => {
    const redoMoveHistory = gameInfo.moveHistoryRedo;
    if (redoMoveHistory.length > 0) {
      const lastRedo = redoMoveHistory[redoMoveHistory.length - 1];
      if (!lastRedo) return;

      dispatch(popMoveHistoryRedo());
      dispatch(pushToMoveHistory(lastRedo));
      setupFromFEN(lastRedo.fenString);
    }
  };

  return { undo, redo };
}
