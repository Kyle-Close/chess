import { Piece } from '../context/board/InitialState';
import {
  MoveMetaData,
  buildMoveMetaData,
} from '../helpers/game-core/move-execution/buildMoveMetaData';
import { executeMove } from '../helpers/game-core/move-execution/executeMove';
import { PieceType } from '../enums/PieceType';
import { getEnPassantCapturedPieceIndex } from '../helpers/game-core/board-utility/getEnPassantCapturedPieceIndex';
import { clearSquare } from '../helpers/game-core/board-management/clearSquare';
import { isPawnAdvancingTwoSquares } from '../helpers/game-core/move-execution/isPawnAdvancingTwoSquares';
import { translatePositionToIndex } from '../helpers/game-core/board-utility/translatePositionToIndex';
import { getSquareRank } from '../helpers/analysis/board-mapping/getSquareRank';
import { getSquareFile } from '../helpers/analysis/board-mapping/getSquareFile';
import { PieceColor } from '../enums/PieceColor';
import { SquareRank } from '../enums/SquareRank';
import { isHalfMoveResetCondition } from '../helpers/game-core/move-execution/isHalfMoveResetCondition';
import { buildFenStringFromGame } from '../helpers/notation-setup/fen-management/buildFenStringFromGame';
import { buildAgebraicNotation } from '../helpers/notation-setup/algebraic-notation/buildAlgebraicNotation';
import { handleOpponentCheckState } from '../helpers/game-core/move-utility/handleOpponentCheckState';
import { handleEnPassant } from '../helpers/game-core/move-utility/handleEnPassant';
import { handleCastle } from '../helpers/game-core/move-utility/handleCastle';
import { updateIsValidMove } from '../helpers/game-core/move-utility/updateIsValidMove';
import { handlePawnPromotion } from '../helpers/game-core/move-utility/handlePawnPromotion';
import { checkInsufficientMaterial } from '../helpers/analysis/game-checks/checkInsufficientMaterial';
import { checkStalemate } from '../helpers/analysis/game-checks/checkStalemate';
import { useAppDispatch, useAppSelector } from './useBoard';
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
import { setIsInCheck, toggleIsTurn } from '../redux/slices/player';
import { selectCastleRightsById } from '../redux/slices/castleRights';
import { useCastleRights } from './useCastleRights';
import { addRemainingSeconds } from '../redux/slices/timer';
import { usePlayer } from './usePlayer';
import { deepCopyBoard } from '../helpers/utilities/deepCopyBoard';
import { getSecondsToIncrement } from '../helpers/game-core/move-utility/getSecondsToIncrement';
import { socket } from '../main';
export interface UseMoveReturn {
  tryMove: (piece: Piece, startPos: number, endPos: number) => boolean;
}

export function useMove(): UseMoveReturn {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.board);
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const settings = useAppSelector((state) => state.gameSettings);

  const whitePlayer = usePlayer({ playerId: gameInfo.whitePlayerId });
  const blackPlayer = usePlayer({ playerId: gameInfo.blackPlayerId });

  const activePlayer = whitePlayer.isTurn ? whitePlayer : blackPlayer;
  const waitingPlayer = whitePlayer.isTurn ? blackPlayer : whitePlayer;

  const whiteCastleRights = useAppSelector((state) =>
    selectCastleRightsById(state, whitePlayer.castleRightsId)
  );
  const blackCastleRights = useAppSelector((state) =>
    selectCastleRightsById(state, blackPlayer.castleRightsId)
  );
  const castleRights = useCastleRights();

  function tryMove(piece: Piece, startPos: number, endPos: number): boolean {
    const newBoard = deepCopyBoard(board);
    const moveMetaData = buildMoveMetaData(
      newBoard,
      gameInfo.enPassantSquare,
      activePlayer.color,
      piece,
      startPos,
      endPos
    );
    updateIsValidMove(
      moveMetaData,
      whitePlayer.isTurn ? whiteCastleRights : blackCastleRights,
      gameInfo.enPassantSquare
    );
    if (!moveMetaData.isMoveValid) return false;

    handleSpecialMoves(moveMetaData); // good
    updateGameState(moveMetaData);

    dispatch(setupBoard(moveMetaData.updatedBoard));
    const newBoardFen = buildFenStringFromGame(
      moveMetaData,
      activePlayer.color === PieceColor.BLACK,
      gameInfo,
      activePlayer.color === PieceColor.WHITE,
      whiteCastleRights,
      blackCastleRights
    );
    socket.emit('go', newBoardFen);

    return true;
  }

  function updateGameState(moveMetaData: MoveMetaData) {
    // Update enPassantNotation & enPassantTargetSquare
    handleEnPassant(moveMetaData);

    // Update turn data
    moveMetaData.activePlayerId = activePlayer.id;
    moveMetaData.waitingPlayerId = waitingPlayer.id;

    // Update move counters
    updateMoveCounts(moveMetaData);

    // Update the moveMetaData board with the move being executed
    executeMove(moveMetaData.updatedBoard, moveMetaData.startPosition, moveMetaData.endPosition);

    // Handle pawn promotion (if applicable)
    handlePawnPromotion(moveMetaData);

    // Handle opponent check & checkmate status
    handleOpponentCheckState(
      moveMetaData,
      waitingPlayer,
      whitePlayer.isTurn ? whiteCastleRights : blackCastleRights,
      gameInfo.enPassantSquare
    );

    // Update castle rights
    castleRights.updateCastleRights(
      moveMetaData.updatedBoard,
      moveMetaData.piece.color,
      activePlayer.castleRightsId
    );

    // Add latest move to game move history
    updateMoveHistory(moveMetaData);

    // Update player check state if in check
    if (moveMetaData.isCheck) {
      dispatch(setIsInCheck({ id: waitingPlayer.id, isInCheck: true }));
      dispatch(setIsInCheck({ id: activePlayer.id, isInCheck: false }));
    } else {
      dispatch(setIsInCheck({ id: activePlayer.id, isInCheck: false }));
      dispatch(setIsInCheck({ id: waitingPlayer.id, isInCheck: false }));
    }

    // Check if game is over. Update gameState if true
    const isOver = handleGameIsOver(moveMetaData);
    if (isOver) {
      dispatch(setIsPlaying(false));
      activePlayer.stopTimer();
      waitingPlayer.stopTimer();
    }
  }

  function handleSpecialMoves(moveMetaData: MoveMetaData) {
    if (moveMetaData.isCastle) handleCastle(moveMetaData);
    if (moveMetaData.piece.type === PieceType.PAWN) handlePawnMoves(moveMetaData);
  }

  function handleGameIsOver(moveMetaData: MoveMetaData) {
    let isOver = false;
    if (moveMetaData.isCheckmate) {
      isOver = true;
      dispatch(setMatchResultSubType(MatchResultSubType.CHECKMATE));
      if (activePlayer.color === PieceColor.WHITE) dispatch(setMatchResult(MatchResult.WHITE_WIN));
      else dispatch(setMatchResult(MatchResult.BLACK_WIN));
    }

    const isFiftyMoveRule = settings.isFiftyMoveRule ? gameInfo.halfMoves > 49 : false;
    const isInsufficientMaterial = checkInsufficientMaterial(moveMetaData.updatedBoard);
    const isStalemate = checkStalemate(
      moveMetaData.updatedBoard,
      moveMetaData.isCheck,
      waitingPlayer.color,
      whitePlayer.isTurn ? whiteCastleRights : blackCastleRights,
      gameInfo.enPassantSquare
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

  function updateMoveHistory(moveMetaData: MoveMetaData) {
    const isBlackTurnEnding = whitePlayer.isTurn === false;

    dispatch(
      pushToMoveHistory({
        fenString: buildFenStringFromGame(
          moveMetaData,
          isBlackTurnEnding,
          gameInfo,
          whitePlayer.isTurn,
          whiteCastleRights,
          blackCastleRights
        ),
        chessNotation: buildAgebraicNotation(moveMetaData),
      })
    );
  }

  function updateMoveCounts(moveMetaData: MoveMetaData) {
    // Update game half moves
    moveMetaData.halfMoves = gameInfo.halfMoves + 1;
    if (isHalfMoveResetCondition(moveMetaData.piece, board[moveMetaData.endPosition].isCapture)) {
      moveMetaData.halfMoves = 0;
    }

    // Update game full moves
    if (activePlayer.color === PieceColor.BLACK) moveMetaData.fullMoves += 1;

    // Handle increment when enabled
    if (settings.isIncrement)
      moveMetaData.increment = {
        timerId: activePlayer.timerId,
        secondsToIncrement: getSecondsToIncrement(settings.timeControl),
      };
  }

  function handlePawnMoves(moveMetaData: MoveMetaData) {
    // Handle capture when en passant executed
    if (moveMetaData.isEnPassant) {
      const capturedPawnIndex = getEnPassantCapturedPieceIndex(
        moveMetaData.endPosition,
        moveMetaData.piece.color
      );

      moveMetaData.isCapture = true;
      moveMetaData.capturedPiece = moveMetaData.updatedBoard[capturedPawnIndex].piece;
      clearSquare(moveMetaData.updatedBoard, capturedPawnIndex);
    }

    // Set enPassantSquare or null it
    if (isPawnAdvancingTwoSquares(moveMetaData.startPosition, moveMetaData.endPosition)) {
      const rank = (getSquareRank(moveMetaData.startPosition) +
        (moveMetaData.piece.color === PieceColor.WHITE ? 1 : -1)) as SquareRank;
      const file = getSquareFile(moveMetaData.startPosition);
      const enPassantSquare = translatePositionToIndex(rank, file);
      moveMetaData.enPassantSquare = enPassantSquare;
    } else moveMetaData.enPassantSquare = null;
  }

  return {
    tryMove,
  };
}
