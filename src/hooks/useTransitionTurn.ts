import { MoveMetaData } from '../helpers/game-core/move-execution/buildMoveMetaData';
import { handleEnPassant } from '../helpers/game-core/move-utility/handleEnPassant';
import {
  clearMoveHistoryRedo,
  setEnPassantSquare,
  setFullMoves,
  setHalfMoves,
  setPawnPromotionSquare,
} from '../redux/slices/gameInfo';
import { toggleIsTurn } from '../redux/slices/player';
import { addRemainingSeconds } from '../redux/slices/timer';
import { useAppDispatch } from './useBoard';

// Take a moveMetaData and run the necessary dispatch's
export function useTransitionTurn() {
  const dispatch = useAppDispatch();

  function transition(moveMetaData: MoveMetaData) {
    // Clear the redo queue
    dispatch(clearMoveHistoryRedo());

    // Update player turns
    dispatch(toggleIsTurn({ id: moveMetaData.activePlayerId }));
    dispatch(toggleIsTurn({ id: moveMetaData.waitingPlayerId }));

    // Update moves
    dispatch(setHalfMoves(moveMetaData.halfMoves));
    dispatch(setFullMoves(moveMetaData.fullMoves));

    // Handle Time Increment
    if (moveMetaData.increment) {
      dispatch(
        addRemainingSeconds({
          id: moveMetaData.increment.timerId,
          secondsToAdd: moveMetaData.increment.secondsToIncrement,
        })
      );
    }

    // Handle pawn promotion logic
    if (moveMetaData.isPromotion) {
      dispatch(setPawnPromotionSquare(moveMetaData.endPosition));
    }

    // Handle en passant
    if (moveMetaData.enPassantSquare) dispatch(setEnPassantSquare(moveMetaData.enPassantSquare));
    else dispatch(setEnPassantSquare(null));
  }

  return {
    transition,
  };
}
