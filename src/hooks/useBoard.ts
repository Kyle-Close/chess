import { useContext, useEffect } from 'react';
import { BoardContext } from '../context/board/BoardContext';
import { useStartEndAction } from './useStartEndAction';
import { validatePieceMove } from '../helpers/game-core/piece-validation/validatePieceMove';
import { Piece, getInitialBoardState } from '../context/board/InitialState';
import { GameState } from '../context/game-state/GameState';
import { buildAgebraicNotation } from '../helpers/notation-setup/algebraic-notation/buildAlgebraicNotation';
import { buildFenStringFromGame } from '../helpers/notation-setup/fen-management/buildFenStringFromGame';
import { PieceType } from '../enums/PieceType';
import { PieceColor } from '../enums/PieceColor';
import { getRookMovementForCastling } from '../helpers/analysis/game-checks/getRookMovementForCastling';
import { isPawnAdvancingTwoSquares } from '../helpers/game-core/move-execution/isPawnAdvancingTwoSquares';
import { translatePositionToIndex } from '../helpers/game-core/board-utility/translatePositionToIndex';
import { getEnPassantCapturedPieceIndex } from '../helpers/game-core/board-utility/getEnPassantCapturedPieceIndex';
import { ValidSquares } from '../helpers/game-core/piece-validation/kingMoveValidation';
import { UsePlayerReturn } from './usePlayer';
import { convertStringToPiece } from '../helpers/utilities/convertStringToPiece';
import { buildEnPassantForFen } from '../helpers/notation-setup/fen-management/buildEnPassantForFen';
import { isHalfMoveResetCondition } from '../helpers/game-core/move-execution/isHalfMoveResetCondition';
import {
  MoveMetaData,
  buildMoveMetaData,
} from '../helpers/game-core/move-execution/buildMoveMetaData';
import { executeMove } from '../helpers/game-core/move-execution/executeMove';
import { clearSquare } from '../helpers/game-core/board-management/clearSquare';
import { assignPieceToSquare } from '../helpers/game-core/board-management/assignPieceToSquare';
import { isKingInCheck } from '../helpers/analysis/game-checks/isKingInCheck';
import { getKingIndex } from '../helpers/analysis/game-checks/getKingIndex';
import { isCheckmate } from '../helpers/analysis/game-checks/isCheckmate';
import { getRemainingPiecesByColor } from '../helpers/game-core/piece-management/getRemainingPiecesByColor';
import { isMoveValid } from '../helpers/game-core/move-execution/isMoveValid';
import { SquareRank } from '../enums/SquareRank';
import { getSquareRank } from '../helpers/analysis/board-mapping/getSquareRank';
import { getSquareFile } from '../helpers/analysis/board-mapping/getSquareFile';

export function useBoard() {
  const { board, setBoard, getPieceAtPosition, clearIsValidSquares } = useContext(BoardContext);
  const gameState = useContext(GameState);
  const startEnd = useStartEndAction();

  const isWhiteTurn = gameState.isWhiteTurn;
  const currentPlayer = isWhiteTurn ? gameState.whitePlayer : gameState.blackPlayer;
  const waitingPlayer = isWhiteTurn ? gameState.blackPlayer : gameState.whitePlayer;

  function resetBoard() {
    setBoard(getInitialBoardState());
  }

  function tryMove(piece: Piece, startPos: number, endPos: number) {
    const moveMetaData = buildMoveMetaData(board, gameState, piece, startPos, endPos);
    updateIsValidMove(moveMetaData);
    if (!moveMetaData.isMoveValid) return;

    handleSpecialMoves(moveMetaData);
    updateGameState(moveMetaData);

    startEnd.clear();
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

  function handlePawnPromotion(moveMetaData: MoveMetaData) {
    if (!moveMetaData.promotionPiece) return;

    assignPieceToSquare(
      moveMetaData.updatedBoard,
      moveMetaData.promotionPiece,
      moveMetaData.endPosition
    );
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

  function handleEnPassant(moveMetaData: MoveMetaData) {
    const { piece, startPosition, endPosition } = moveMetaData;

    if (piece.type === PieceType.PAWN && isPawnAdvancingTwoSquares(startPosition, endPosition)) {
      const enPassantSquareIndex = getEnPassantCapturedPieceIndex(endPosition, piece.color);
      moveMetaData.enPassantNotation = buildEnPassantForFen(enPassantSquareIndex);
    } else {
      gameState.updateEnPassantSquare(null);
    }
  }

  function updateMoveCounts(moveMetaData: MoveMetaData) {
    // Update game half moves
    gameState.move.updateHalfMoves('INCREMENT');

    if (isHalfMoveResetCondition(moveMetaData.piece, board[moveMetaData.endPosition].isCapture))
      gameState.move.updateHalfMoves(0);

    // Update game full moves
    if (currentPlayer.color === PieceColor.BLACK) gameState.move.updateFullMoves('INCREMENT');
  }

  function handleSpecialMoves(moveMetaData: MoveMetaData) {
    if (moveMetaData.isCastle) handleCastle(moveMetaData);
    if (moveMetaData.piece.type === PieceType.PAWN) handlePawnMoves(moveMetaData);
  }

  function handleCastle(moveMetaData: MoveMetaData) {
    const rookStartEnd = getRookMovementForCastling(moveMetaData.endPosition);
    if (!rookStartEnd) return;

    const rook = getPieceAtPosition(rookStartEnd.start);
    if (rook) executeMove(moveMetaData.updatedBoard, rookStartEnd.start, rookStartEnd.end);
  }

  function updateIsValidMove(moveMetaData: MoveMetaData) {
    const { startPosition, endPosition, piece } = moveMetaData;
    const { castleRights } = currentPlayer;
    const { enPassantSquare } = gameState;

    if (isMoveValid(board, piece, startPosition, endPosition, castleRights, enPassantSquare))
      moveMetaData.isMoveValid = true;
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

  function handleShowValidMoves(startPos: number) {
    const currentPiece = getPieceAtPosition(startPos);
    if (currentPiece) {
      const validMoves = getValidMoves(currentPiece, startPos);
      if (validMoves) highlightValidMoves(validMoves);
    }
  }

  function getValidMoves(piece: Piece, startPos: number) {
    const validMoves = validatePieceMove(
      board,
      piece,
      startPos,
      undefined,
      gameState.enPassantSquare
    );
    if (piece.type === PieceType.KING && validMoves) addCastleMoves(validMoves, currentPlayer);
    return validMoves;
  }

  function addCastleMoves(validMoves: ValidSquares[], player: UsePlayerReturn) {
    if (player.color === PieceColor.WHITE) {
      if (player.castleRights.canCastleKingSide) validMoves.push({ index: 6, isCapture: false });
      if (player.castleRights.canCastleQueenSide) validMoves.push({ index: 2, isCapture: false });
    } else {
      if (player.castleRights.canCastleKingSide) validMoves.push({ index: 62, isCapture: false });
      if (player.castleRights.canCastleQueenSide) validMoves.push({ index: 58, isCapture: false });
    }
  }

  function highlightValidMoves(validMoves: ValidSquares[]) {
    setBoard((prevBoard) => {
      const copy = [...prevBoard];
      validMoves.forEach((move) => {
        if (move.isCapture) copy[move.index].isCapture = true;
        copy[move.index].isValidMove = true;
      });
      return copy;
    });
  }

  const handleSquareClicked = (index: number) => {
    const isValidClick = isClickingValidSquare(index, startEnd.startPos !== null);
    if (isValidClick) startEnd.setPosition(index);
  };

  const handleRightClickOnBoard = () => {
    startEnd.setStartPos(null);
    clearIsValidSquares();
  };

  const isClickingValidSquare = (index: number, isFinalClick: boolean) => {
    const piece = getPieceAtPosition(index);
    if ((piece && piece.color === currentPlayer.color) || !piece) return true;
    if (piece && piece.color !== currentPlayer.color && isFinalClick) return true;
    return false;
  };

  useEffect(() => {
    if (startEnd.startPos === null) clearIsValidSquares();
    else if (startEnd.startPos !== null && startEnd.endPos === null) {
      if (isClickingValidSquare(startEnd.startPos, true)) handleShowValidMoves(startEnd.startPos);
    } else if (startEnd.startPos !== null && startEnd.endPos !== null) {
      const piece = getPieceAtPosition(startEnd.startPos);
      if (piece) tryMove(piece, startEnd.startPos, startEnd.endPos);
    }
  }, [startEnd.startPos, startEnd.endPos]);

  return {
    board,
    startPos: startEnd.startPos,
    handleSquareClicked,
    handleRightClickOnBoard,
    resetBoard,
  };
}
