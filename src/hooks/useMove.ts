import { useContext, useState } from 'react';
import { Piece } from '../context/board/InitialState';
import {
  MoveMetaData,
  buildMoveMetaData,
} from '../helpers/game-core/move-execution/buildMoveMetaData';
import { GameState } from '../context/game-state/GameState';
import { BoardContext } from '../context/board/BoardContext';
import { getRookMovementForCastling } from '../helpers/analysis/game-checks/getRookMovementForCastling';
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
import { isMoveValid } from '../helpers/game-core/move-execution/isMoveValid';
import { buildEnPassantForFen } from '../helpers/notation-setup/fen-management/buildEnPassantForFen';
import { isHalfMoveResetCondition } from '../helpers/game-core/move-execution/isHalfMoveResetCondition';
import { buildFenStringFromGame } from '../helpers/notation-setup/fen-management/buildFenStringFromGame';
import { buildAgebraicNotation } from '../helpers/notation-setup/algebraic-notation/buildAlgebraicNotation';
import { getKingIndex } from '../helpers/analysis/game-checks/getKingIndex';
import { isKingInCheck } from '../helpers/analysis/game-checks/isKingInCheck';
import { getRemainingPiecesByColor } from '../helpers/game-core/piece-management/getRemainingPiecesByColor';
import { isCheckmate } from '../helpers/analysis/game-checks/isCheckmate';

export interface UseMoveReturn {
  halfMoves: number;
  updateHalfMoves: (value: number | 'INCREMENT') => void;
  fullMoves: number;
  updateFullMoves: (value: number | 'INCREMENT') => void;
  resetGameStateMoves: () => void;
  tryMove: (piece: Piece, startPos: number, endPos: number) => boolean;
}

export function useMove(): UseMoveReturn {
  const gameState = useContext(GameState);
  const { board, setBoard } = useContext(BoardContext);
  const [halfMoves, setHalfMoves] = useState(0);
  const [fullMoves, setFullMoves] = useState(0);

  const isWhiteTurn = gameState.isWhiteTurn;
  const waitingPlayer = isWhiteTurn ? gameState.blackPlayer : gameState.whitePlayer;
  const currentPlayer = isWhiteTurn ? gameState.whitePlayer : gameState.blackPlayer;

  function tryMove(piece: Piece, startPos: number, endPos: number): boolean {
    const moveMetaData = buildMoveMetaData(board, gameState, piece, startPos, endPos);
    updateIsValidMove(moveMetaData);
    if (!moveMetaData.isMoveValid) return false;

    handleSpecialMoves(moveMetaData);
    updateGameState(moveMetaData);

    return true;
  }

  function updateIsValidMove(moveMetaData: MoveMetaData) {
    const { startPosition, endPosition, piece } = moveMetaData;
    const { castleRights } = currentPlayer;
    const { enPassantSquare } = gameState;

    if (isMoveValid(board, piece, startPosition, endPosition, castleRights, enPassantSquare))
      moveMetaData.isMoveValid = true;
  }

  function updateGameState(moveMetaData: MoveMetaData) {
    // Clear the redo queue
    gameState.clearMoveHistoryRedo();

    // Handle piece capture
    if (moveMetaData.capturedPiece)
      currentPlayer.enemyPieceCaptured(moveMetaData.capturedPiece.type);

    // Handle en passant
    handleEnPassant(moveMetaData);

    // Update turn
    gameState.toggleTurn();

    // Update move counters
    updateMoveCounts(moveMetaData);

    // Update the moveMetaData board with the move being executed
    executeMove(moveMetaData.updatedBoard, moveMetaData.startPosition, moveMetaData.endPosition);

    // Handle pawn promotion (if applicable)
    handlePawnPromotion(moveMetaData);

    // Handle opponent check & checkmate status
    handleOpponentCheckState(moveMetaData);

    // Add latest move to game move history
    updateMoveHistory(moveMetaData);

    // Check if game is over. Update gameState if true
    handleGameIsOver(moveMetaData);

    // Finally, update global board state with updated board after move
    setBoard(moveMetaData.updatedBoard);
  }

  function handleSpecialMoves(moveMetaData: MoveMetaData) {
    if (moveMetaData.isCastle) handleCastle(moveMetaData);
    if (moveMetaData.piece.type === PieceType.PAWN) handlePawnMoves(moveMetaData);
  }

  function handleEnPassant(moveMetaData: MoveMetaData) {
    const { piece, startPosition, endPosition } = moveMetaData;

    if (piece.type === PieceType.PAWN && isPawnAdvancingTwoSquares(startPosition, endPosition)) {
      const enPassantSquareIndex = getEnPassantCapturedPieceIndex(endPosition, piece.color);
      moveMetaData.enPassantNotation = buildEnPassantForFen(enPassantSquareIndex);
    } else {
      gameState.updateEnPassantSquare(null);
    }
  }

  function handleGameIsOver(moveMetaData: MoveMetaData) {
    if (moveMetaData.isCheckmate) gameState.updateMatchResult(currentPlayer);
  }

  function updateMoveHistory(moveMetaData: MoveMetaData) {
    const isBlackTurnEnding = gameState.isWhiteTurn === false;

    gameState.pushToMoveHistory({
      fenString: buildFenStringFromGame(gameState, moveMetaData, isBlackTurnEnding),
      chessNotation: buildAgebraicNotation(moveMetaData),
    });
  }

  function handleOpponentCheckState(moveMetaData: MoveMetaData) {
    // See if move put opponent in check and/or checkmate
    const oppKingIndex = getKingIndex(moveMetaData.updatedBoard, waitingPlayer.color);
    if (!isKingInCheck(moveMetaData.updatedBoard, oppKingIndex, waitingPlayer.color)) return;

    moveMetaData.isCheck = true;
    const oppKing = moveMetaData.updatedBoard[oppKingIndex].piece;
    if (!oppKing) return;

    const oppRemainingPlayerPieces = getRemainingPiecesByColor(
      moveMetaData.updatedBoard,
      oppKing.color,
      true
    );

    if (isCheckmate(moveMetaData.updatedBoard, oppKing, oppKingIndex, oppRemainingPlayerPieces))
      moveMetaData.isCheckmate = true;
  }

  function updateMoveCounts(moveMetaData: MoveMetaData) {
    // Update game half moves
    gameState.move.updateHalfMoves('INCREMENT');

    if (isHalfMoveResetCondition(moveMetaData.piece, board[moveMetaData.endPosition].isCapture))
      gameState.move.updateHalfMoves(0);

    // Update game full moves
    if (currentPlayer.color === PieceColor.BLACK) gameState.move.updateFullMoves('INCREMENT');
  }

  function handleCastle(moveMetaData: MoveMetaData) {
    const rookStartEnd = getRookMovementForCastling(moveMetaData.endPosition);
    if (!rookStartEnd) return;

    const rook = board[rookStartEnd.start].piece;
    if (rook) executeMove(moveMetaData.updatedBoard, rookStartEnd.start, rookStartEnd.end);
  }

  function handlePawnPromotion(moveMetaData: MoveMetaData) {
    if (!moveMetaData.promotionPiece) return;

    assignPieceToSquare(
      moveMetaData.updatedBoard,
      moveMetaData.promotionPiece,
      moveMetaData.endPosition
    );
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
      gameState.updateEnPassantSquare(
        translatePositionToIndex(
          (getSquareRank(moveMetaData.startPosition) +
            (moveMetaData.piece.color === PieceColor.WHITE ? 1 : -1)) as SquareRank,
          getSquareFile(moveMetaData.startPosition)
        )
      );
    } else gameState.updateEnPassantSquare(null);

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

  function updateHalfMoves(value: number | 'INCREMENT') {
    if (value === 'INCREMENT') setHalfMoves((prevHalfMoves) => prevHalfMoves + 1);
    else setHalfMoves(value);
  }

  function updateFullMoves(value: number | 'INCREMENT') {
    if (value === 'INCREMENT') setFullMoves((prevFullMoves) => prevFullMoves + 1);
    else setFullMoves(value);
  }

  function resetGameStateMoves() {
    setHalfMoves(0);
    setFullMoves(0);
  }

  return {
    halfMoves,
    updateHalfMoves,
    fullMoves,
    updateFullMoves,
    resetGameStateMoves: resetGameStateMoves,
    tryMove,
  };
}
