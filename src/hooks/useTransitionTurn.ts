import { PieceColor } from '../enums/PieceColor';
import { checkInsufficientMaterial } from '../helpers/analysis/game-checks/checkInsufficientMaterial';
import { checkStalemate } from '../helpers/analysis/game-checks/checkStalemate';
import { getTotalMaterialValue } from '../helpers/analysis/getMaterialValue';
import { MoveMetaData } from '../helpers/game-core/move-execution/buildMoveMetaData';
import { buildAgebraicNotation } from '../helpers/notation-setup/algebraic-notation/buildAlgebraicNotation';
import { buildFenStringFromGame } from '../helpers/notation-setup/fen-management/buildFenStringFromGame';
import { socket } from '../main';
import { setupBoard } from '../redux/slices/board';

import {
  MatchResult,
  MatchResultSubType,
  clearMoveHistoryRedo,
  pushToMoveHistory,
  setEnPassantSquare,
  setFullMoves,
  setHalfMoves,
  setIsPlaying,
  setMatchResult,
  setMatchResultSubType,
} from '../redux/slices/gameInfo';
import { setIsInCheck, setRemainingMaterialValue, toggleIsTurn } from '../redux/slices/player';
import { addRemainingSeconds } from '../redux/slices/timer';
import { useAppDispatch, useAppSelector } from './useBoard';

// Take a moveMetaData and run the necessary dispatch's
export function useTransitionTurn() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.gameSettings);

  function transition(moveMetaData: MoveMetaData) {
    // Update player remaining material value
    const activePlayerMaterialVal = getTotalMaterialValue(
      moveMetaData.updatedBoard,
      moveMetaData.piece.color
    );
    dispatch(
      setRemainingMaterialValue({ id: moveMetaData.activePlayerId, value: activePlayerMaterialVal })
    );
    const waitingPlayerMaterialVal = getTotalMaterialValue(
      moveMetaData.updatedBoard,
      moveMetaData.piece.color === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE
    );
    dispatch(
      setRemainingMaterialValue({
        id: moveMetaData.waitingPlayerId,
        value: waitingPlayerMaterialVal,
      })
    );

    // Clear the redo queue
    dispatch(clearMoveHistoryRedo());

    // Update player turns
    dispatch(toggleIsTurn({ id: moveMetaData.activePlayerId }));
    dispatch(toggleIsTurn({ id: moveMetaData.waitingPlayerId }));

    // Update moves
    dispatch(setHalfMoves(moveMetaData.halfMoves));
    dispatch(setFullMoves(moveMetaData.fullMoves));

    // Update player check state if in check
    if (moveMetaData.isCheck) {
      dispatch(setIsInCheck({ id: moveMetaData.waitingPlayerId, isInCheck: true }));
      dispatch(setIsInCheck({ id: moveMetaData.activePlayerId, isInCheck: false }));
    } else {
      dispatch(setIsInCheck({ id: moveMetaData.activePlayerId, isInCheck: false }));
      dispatch(setIsInCheck({ id: moveMetaData.waitingPlayerId, isInCheck: false }));
    }

    // Handle Time Increment
    if (moveMetaData.increment) {
      dispatch(
        addRemainingSeconds({
          id: moveMetaData.increment.timerId,
          secondsToAdd: moveMetaData.increment.secondsToIncrement,
        })
      );
    }

    // Handle en passant
    if (moveMetaData.enPassantSquare) dispatch(setEnPassantSquare(moveMetaData.enPassantSquare));
    else dispatch(setEnPassantSquare(null));

    // Update move history
    dispatch(
      pushToMoveHistory({
        fenString: buildFenStringFromGame(
          moveMetaData,
          moveMetaData.updatedWhiteCastleRights,
          moveMetaData.updatedBlackCastleRights
        ),
        chessNotation: buildAgebraicNotation(moveMetaData),
      })
    );

    // Check if game is over. Update gameState if true
    const isOver = handleGameIsOver(moveMetaData);
    if (isOver) dispatch(setIsPlaying(false));

    // Trigger the latest board update
    dispatch(setupBoard(moveMetaData.updatedBoard));

    const newBoardFen = buildFenStringFromGame(
      moveMetaData,
      moveMetaData.updatedWhiteCastleRights,
      moveMetaData.updatedBlackCastleRights
    );

    socket.emit('go', newBoardFen);
  }

  function handleGameIsOver(moveMetaData: MoveMetaData) {
    let isOver = false;
    if (moveMetaData.isCheckmate) {
      isOver = true;
      dispatch(setMatchResultSubType(MatchResultSubType.CHECKMATE));
      if (moveMetaData.piece.color === PieceColor.WHITE)
        dispatch(setMatchResult(MatchResult.WHITE_WIN));
      else dispatch(setMatchResult(MatchResult.BLACK_WIN));
    }

    const isFiftyMoveRule = settings.isFiftyMoveRule ? moveMetaData.halfMoves > 49 : false;
    const isInsufficientMaterial = checkInsufficientMaterial(moveMetaData.updatedBoard);
    const isStalemate = checkStalemate(
      moveMetaData.updatedBoard,
      moveMetaData.isCheck,
      moveMetaData.piece.color,
      moveMetaData.piece.color === PieceColor.WHITE
        ? moveMetaData.updatedWhiteCastleRights
        : moveMetaData.updatedBlackCastleRights,
      moveMetaData.enPassantSquare
    );

    if (isFiftyMoveRule) dispatch(setMatchResultSubType(MatchResultSubType.FIFTY_MOVE_RULE));
    else if (isInsufficientMaterial)
      dispatch(setMatchResultSubType(MatchResultSubType.INSUFFICIENT_MATERIAL));
    else if (isStalemate) dispatch(setMatchResultSubType(MatchResultSubType.STALEMATE));

    if (isFiftyMoveRule || isInsufficientMaterial || isStalemate) {
      isOver = true;
      dispatch(setMatchResult(MatchResult.DRAW));
    }

    return isOver;
  }

  return {
    transition,
  };
}
