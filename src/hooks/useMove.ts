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
import { convertStringToPiece } from '../helpers/utilities/convertStringToPiece';
import { assignPieceToSquare } from '../helpers/game-core/board-management/assignPieceToSquare';
import { isHalfMoveResetCondition } from '../helpers/game-core/move-execution/isHalfMoveResetCondition';
import { buildFenStringFromGame } from '../helpers/notation-setup/fen-management/buildFenStringFromGame';
import { buildAgebraicNotation } from '../helpers/notation-setup/algebraic-notation/buildAlgebraicNotation';
import { handleOpponentCheckState } from '../helpers/game-core/move-utility/handleOpponentCheckState';
import { handleEnPassant } from '../helpers/game-core/move-utility/handleEnPassant';
import { handleCastle } from '../helpers/game-core/move-utility/handleCastle';
import { updateIsValidMove } from '../helpers/game-core/move-utility/updateIsValidMove';
import { handlePawnPromotion } from '../helpers/game-core/move-utility/handlePawnPromotion';
import { isInsufficientMaterial } from '../helpers/analysis/game-checks/isInsufficientMaterial';
import { isStalemate } from '../helpers/analysis/game-checks/isStalemate';
import { useAppDispatch, useAppSelector } from './useBoard';
import { setupBoard } from '../redux/slices/board';
import {
  MatchResult,
  clearMoveHistoryRedo,
  pushToMoveHistory,
  setEnPassantSquare,
  setFullMoves,
  setHalfMoves,
  setMatchResult,
} from '../redux/slices/gameInfo';
import { selectPlayerById, toggleIsTurn } from '../redux/slices/player';
import { selectCastleRightsById } from '../redux/slices/castleRights';
import { useCastleRights } from './useCastleRights';

export interface UseMoveReturn {
  tryMove: (piece: Piece, startPos: number, endPos: number) => boolean;
}

export function useMove(): UseMoveReturn {
  const board = useAppSelector((state) => state.board);
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const whitePlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.whitePlayerId));
  const blackPlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.blackPlayerId));
  if (!whitePlayer || !blackPlayer) return {} as UseMoveReturn;
  const dispatch = useAppDispatch();
  const activePlayer = whitePlayer.isTurn ? whitePlayer : blackPlayer;
  const waitingPlayer = whitePlayer.isTurn ? blackPlayer : whitePlayer;
  const whiteCastleRights = useAppSelector((state) =>
    selectCastleRightsById(state, whitePlayer.castleRightsId)
  );
  const blackCastleRights = useAppSelector((state) =>
    selectCastleRightsById(state, blackPlayer.castleRightsId)
  );
  const castleRights = useCastleRights({
    id: whitePlayer.isTurn ? whiteCastleRights.id : blackCastleRights.id,
  });

  function tryMove(piece: Piece, startPos: number, endPos: number): boolean {
    const moveMetaData = buildMoveMetaData(
      board,
      gameInfo.enPassantSquare,
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

    handleSpecialMoves(moveMetaData);
    updateGameState(moveMetaData);

    return true;
  }

  function updateGameState(moveMetaData: MoveMetaData) {
    // Clear the redo queue
    dispatch(clearMoveHistoryRedo());

    // Handle en passant
    const isEnPassant = handleEnPassant(moveMetaData);
    if (!isEnPassant) dispatch(setEnPassantSquare(null));

    // Flip the board for next player
    //gameState.toggleShowWhiteOnBottom();

    // Update player turns
    dispatch(toggleIsTurn({ id: gameInfo.whitePlayerId }));
    dispatch(toggleIsTurn({ id: gameInfo.blackPlayerId }));

    // Update move counters
    updateMoveCounts(moveMetaData);

    // Update the moveMetaData board with the move being executed
    const boardAfterMove = executeMove(
      moveMetaData.updatedBoard,
      moveMetaData.startPosition,
      moveMetaData.endPosition,
      true
    );

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
    castleRights.updateCastleRights(moveMetaData.updatedBoard, moveMetaData.piece.color);

    // Add latest move to game move history
    updateMoveHistory(moveMetaData);

    // Check if game is over. Update gameState if true
    handleGameIsOver(moveMetaData);

    // Finally, update global board state with updated board after move
    dispatch(setupBoard(boardAfterMove));
  }

  function handleSpecialMoves(moveMetaData: MoveMetaData) {
    if (moveMetaData.isCastle) handleCastle(moveMetaData);
    if (moveMetaData.piece.type === PieceType.PAWN) handlePawnMoves(moveMetaData);
  }

  function handleGameIsOver(moveMetaData: MoveMetaData) {
    if (moveMetaData.isCheckmate) {
      if (activePlayer.color === PieceColor.WHITE) dispatch(setMatchResult(MatchResult.WHITE_WIN));
      else dispatch(setMatchResult(MatchResult.BLACK_WIN));
    }

    const isDraw =
      gameInfo.halfMoves >= 49 ||
      isInsufficientMaterial(moveMetaData.updatedBoard) ||
      isStalemate(
        moveMetaData.updatedBoard,
        moveMetaData.isCheck,
        waitingPlayer.color,
        whitePlayer.isTurn ? whiteCastleRights : blackCastleRights,
        gameInfo.enPassantSquare
      );
    if (isDraw) dispatch(setMatchResult(MatchResult.DRAW));
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
    dispatch(setHalfMoves(gameInfo.halfMoves + 1));

    if (isHalfMoveResetCondition(moveMetaData.piece, board[moveMetaData.endPosition].isCapture))
      dispatch(setHalfMoves(0));

    // Update game full moves
    if (activePlayer.color === PieceColor.BLACK) dispatch(setFullMoves(gameInfo.fullMoves + 1));
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

    // Set or clear gameState en passant state
    if (isPawnAdvancingTwoSquares(moveMetaData.startPosition, moveMetaData.endPosition)) {
      const rank = (getSquareRank(moveMetaData.startPosition) +
        (moveMetaData.piece.color === PieceColor.WHITE ? 1 : -1)) as SquareRank;
      const file = getSquareFile(moveMetaData.startPosition);
      const enPassantSquare = translatePositionToIndex(rank, file);

      dispatch(setEnPassantSquare(enPassantSquare));
    } else dispatch(setEnPassantSquare(null));

    // Handle pawn promotion logic
    if (moveMetaData.isPromotion) {
      const input = prompt('Promote your pawn');
      if (!input || moveMetaData.piece.color === null) return;

      const newPiece = convertStringToPiece(input, moveMetaData.piece.color);

      // Update moveMetaData promotion piece
      moveMetaData.promotionPiece = newPiece;

      // Update the game board with promoted piece
      assignPieceToSquare(moveMetaData.updatedBoard, newPiece, moveMetaData.endPosition);
    }
  }

  return {
    tryMove,
  };
}
