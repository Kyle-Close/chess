import { useContext, useEffect } from 'react';
import { BoardContext } from '../context/board/BoardContext';
import { useStartEndAction } from './useStartEndAction';
import { validatePieceMove } from '../helpers/validations/validatePieceMove';
import { Piece } from '../context/board/InitialState';
import { GameState } from '../context/GameState';
import { buildChessNotation } from '../helpers/move/buildChessNotation';
import { buildFenStringFromGame } from '../helpers/game-setup/buildFenStringFromGame';
import { PieceType } from '../enums/PieceType';
import { PieceColor } from '../enums/PieceColor';
import { getCastleRookStartEndPosition } from '../helpers/board/getCastleRookStartEndPosition';
import { isPawnAdvancingTwoSquares } from '../helpers/move/isPawnAdvancingTwoSquares';
import { getSquareIndexByRankAndFile } from '../helpers/board/getSquareIndexByRankAndFile';
import { PieceRank, getPieceFile, getPieceRank } from '../helpers/generic/pieceLocation';
import { getEnPassantCapturedPieceIndex } from '../helpers/board/getEnPassantCapturedPieceIndex';
import { ValidSquares } from '../helpers/validations/pieces/kingMoveValidation';
import { UsePlayerReturn } from './usePlayer';
import { convertStringToPiece } from '../helpers/generic/convertStringToPiece';
import { buildEnPassantForFen } from '../helpers/game-setup/buildEnPassantForFen';
import { isHalfMoveResetCondition } from '../helpers/move/isHalfMoveResetCondition';
import { MoveMetaData, buildMoveMetaData } from '../helpers/move/buildMoveMetaData';
import { executeMove } from '../helpers/move/executeMove';
import { clearSquare } from '../helpers/board/clearSquare';
import { placePieceOnSquare } from '../helpers/board/placePieceOnSquare';

export function useBoard() {
  const { board, setBoard, getPieceAtPosition, clearIsValidSquares } =
    useContext(BoardContext);
  const gameState = useContext(GameState);
  const startEnd = useStartEndAction();

  const isWhiteTurn = gameState.isWhiteTurn;
  const currentPlayer = isWhiteTurn ? gameState.whitePlayer : gameState.blackPlayer;
  const waitingPlayer = isWhiteTurn ? gameState.blackPlayer : gameState.whitePlayer;

  function tryMove(piece: Piece, startPos: number, endPos: number) {
    if (!isValidMove(piece, startPos, endPos)) return;
    const moveMetaData = buildMoveMetaData(board, gameState, piece, startPos, endPos);

    handleSpecialMoves(moveMetaData);
    updateGameState(moveMetaData);

    startEnd.clear();
  }

  function isValidMove(piece: Piece, startPos: number, endPos: number) {
    const validMoves = validatePieceMove(
      board,
      piece,
      startPos,
      currentPlayer.castleRights,
      gameState.enPassantSquare
    );
    return validMoves && validMoves.some((move) => move.index === endPos);
  }

  function updateGameState(moveMetaData: MoveMetaData) {
    const isBlackTurnEnding = gameState.isWhiteTurn === false;
    let enPassantAlgebraicNotation = '';

    // If piece was captured update that in player data
    if (moveMetaData.capturedPiece)
      currentPlayer.enemyPieceCaptured(moveMetaData.capturedPiece.type);

    if (
      moveMetaData.piece.type === PieceType.PAWN &&
      isPawnAdvancingTwoSquares(moveMetaData.startPosition, moveMetaData.endPosition)
    ) {
      const enPassantSquareIndex = getSquareIndexByRankAndFile(
        (getPieceRank(moveMetaData.startPosition) +
          (moveMetaData.piece.color === PieceColor.WHITE ? 1 : -1)) as PieceRank,
        getPieceFile(moveMetaData.startPosition)
      );

      enPassantAlgebraicNotation = buildEnPassantForFen(enPassantSquareIndex);
    }

    // Update turn
    gameState.toggleTurn();

    // Update game half moves
    gameState.move.updateHalfMoves('INCREMENT');

    if (
      isHalfMoveResetCondition(
        moveMetaData.piece,
        board[moveMetaData.endPosition].isCapture
      )
    )
      gameState.move.updateHalfMoves(0);

    // Update game full moves
    if (currentPlayer.color === PieceColor.BLACK)
      gameState.move.updateFullMoves('INCREMENT');

    if (waitingPlayer.checkForCheckmate(moveMetaData.updatedBoard)) {
      gameState.updateWinner(currentPlayer);
    }

    executeMove(
      moveMetaData.updatedBoard,
      moveMetaData.startPosition,
      moveMetaData.endPosition
    );

    // Handle changing the pawn piece to the promoted piece
    if (moveMetaData.promotionPiece)
      placePieceOnSquare(
        moveMetaData.updatedBoard,
        moveMetaData.promotionPiece,
        moveMetaData.endPosition
      );

    // Add latest move to game move history
    gameState.pushToMoveHistory({
      fenString: buildFenStringFromGame(
        gameState,
        moveMetaData,
        isBlackTurnEnding,
        enPassantAlgebraicNotation
      ),
      chessNotation: buildChessNotation(moveMetaData),
    });

    setBoard(moveMetaData.updatedBoard);
  }

  function handleSpecialMoves(moveMetaData: MoveMetaData) {
    if (moveMetaData.isCastle) handleCastle(moveMetaData);
    if (moveMetaData.piece.type === PieceType.PAWN) handlePawnMoves(moveMetaData);
  }

  function handleCastle(moveMetaData: MoveMetaData) {
    const rookStartEnd = getCastleRookStartEndPosition(moveMetaData.endPosition);
    if (!rookStartEnd) return;

    const rook = getPieceAtPosition(rookStartEnd.start);
    if (rook)
      executeMove(moveMetaData.updatedBoard, rookStartEnd.start, rookStartEnd.end);
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
        getSquareIndexByRankAndFile(
          (getPieceRank(moveMetaData.startPosition) +
            (moveMetaData.piece.color === PieceColor.WHITE ? 1 : -1)) as PieceRank,
          getPieceFile(moveMetaData.startPosition)
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
      placePieceOnSquare(moveMetaData.updatedBoard, newPiece, moveMetaData.endPosition);
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
    if (piece.type === PieceType.KING && validMoves)
      addCastleMoves(validMoves, currentPlayer);
    return validMoves;
  }

  function addCastleMoves(validMoves: ValidSquares[], player: UsePlayerReturn) {
    if (player.color === PieceColor.WHITE) {
      if (player.castleRights.canCastleKingSide)
        validMoves.push({ index: 6, isCapture: false });
      if (player.castleRights.canCastleQueenSide)
        validMoves.push({ index: 2, isCapture: false });
    } else {
      if (player.castleRights.canCastleKingSide)
        validMoves.push({ index: 62, isCapture: false });
      if (player.castleRights.canCastleQueenSide)
        validMoves.push({ index: 58, isCapture: false });
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
      if (isClickingValidSquare(startEnd.startPos, true))
        handleShowValidMoves(startEnd.startPos);
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
  };
}
