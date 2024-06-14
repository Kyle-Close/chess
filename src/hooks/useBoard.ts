import { useContext, useEffect } from 'react';
import { BoardContext } from '../context/board/BoardContext';
import { usePiece } from './usePiece';
import { useStartEndAction } from './useStartEndAction';
import { validatePieceMove } from '../helpers/validations/validatePieceMove';
import { Piece } from '../context/board/InitialState';
import { GameState } from '../context/GameState';
import { copyBoardAndUpdate } from '../helpers/board/copyBoardAndUpdate';
import { buildChessNotation } from '../helpers/move/buildChessNotation';
import { buildFenStringFromGame } from '../helpers/game-setup/buildFenStringFromGame';
import { PieceType } from '../enums/PieceType';
import { PieceColor } from '../enums/PieceColor';
import { isMoveCastle } from '../helpers/move/isMoveCastle';
import { getCastleRookStartEndPosition } from '../helpers/board/getCastleRookStartEndPosition';
import { isPawnAdvancingTwoSquares } from '../helpers/move/isPawnAdvancingTwoSquares';
import { getSquareIndexByRankAndFile } from '../helpers/board/getSquareIndexByRankAndFile';
import { PieceRank, getPieceFile, getPieceRank } from '../helpers/generic/pieceLocation';
import { getEnPassantCapturedPieceIndex } from '../helpers/board/getEnPassantCapturedPieceIndex';
import { ValidSquares } from '../helpers/validations/pieces/kingMoveValidation';
import { UsePlayerReturn } from './usePlayer';
import { isMovePawnPromotion } from '../helpers/move/isMovePawnPromotion';
import { convertStringToPiece } from '../helpers/generic/convertStringToPiece';
import { buildEnPassantForFen } from '../helpers/game-setup/buildEnPassantForFen';
import { isHalfMoveResetCondition } from '../helpers/move/isHalfMoveResetCondition';

export function useBoard() {
  const { board, setBoard, getPieceAtPosition, clearIsValidSquares } =
    useContext(BoardContext);
  const { move } = usePiece();
  const gameState = useContext(GameState);
  const startEnd = useStartEndAction();

  const isWhiteTurn = gameState.isWhiteTurn;
  const currentPlayer = isWhiteTurn ? gameState.whitePlayer : gameState.blackPlayer;
  const waitingPlayer = isWhiteTurn ? gameState.blackPlayer : gameState.whitePlayer;

  function tryMove(piece: Piece, startPos: number, endPos: number) {
    if (!isValidMove(piece, startPos, endPos)) return;

    const capturedPiece = getPieceAtPosition(endPos);
    if (capturedPiece) currentPlayer.enemyPieceCaptured(capturedPiece.type);

    updateGameState(piece, startPos, endPos);
    handleSpecialMoves(piece, startPos, endPos);
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

  function updateGameState(piece: Piece, startPos: number, endPos: number) {
    const updatedBoard = copyBoardAndUpdate(board, piece, startPos, endPos);
    let enPassantAlgebraicNotation = '-';

    if (piece.type === PieceType.PAWN && isPawnAdvancingTwoSquares(startPos, endPos)) {
      const enPassantSquareIndex = getSquareIndexByRankAndFile(
        (getPieceRank(startPos) +
          (piece.color === PieceColor.WHITE ? 1 : -1)) as PieceRank,
        getPieceFile(startPos)
      );

      enPassantAlgebraicNotation = buildEnPassantForFen(enPassantSquareIndex);
    }

    // Update turn
    gameState.toggleTurn();

    // Update game half moves
    gameState.move.updateHalfMoves('INCREMENT');

    if (isHalfMoveResetCondition(piece, board[endPos].isCapture))
      gameState.move.updateHalfMoves(0);

    // Update game full moves
    if (currentPlayer.color === PieceColor.BLACK)
      gameState.move.updateFullMoves('INCREMENT');

    // Add latest move to game move history
    gameState.pushToMoveHistory({
      fenString: buildFenStringFromGame(
        updatedBoard,
        waitingPlayer.color,
        enPassantAlgebraicNotation,
        currentPlayer.castleRights,
        waitingPlayer.castleRights,
        gameState.move
      ),
      chessNotation: buildChessNotation(
        board,
        piece,
        startPos,
        endPos,
        waitingPlayer.color
      ),
    });

    if (waitingPlayer.checkForCheckmate(updatedBoard)) {
      gameState.updateWinner(currentPlayer);
    }

    move(piece, startPos, endPos);
  }

  function handleSpecialMoves(piece: Piece, startPos: number, endPos: number) {
    if (isMoveCastle(piece, startPos, endPos)) {
      handleCastle(endPos);
    }
    if (piece.type === PieceType.PAWN) {
      handlePawnMoves(piece, startPos, endPos);
    }
  }

  function handleCastle(endPos: number) {
    const rookStartEnd = getCastleRookStartEndPosition(endPos);
    if (rookStartEnd) {
      const rook = getPieceAtPosition(rookStartEnd.start);
      if (rook) move(rook, rookStartEnd.start, rookStartEnd.end);
    }
  }

  function handlePawnMoves(piece: Piece, startPos: number, endPos: number) {
    // Handle capture when en passant executed
    if (endPos === gameState.enPassantSquare && piece.color !== null) {
      const opponentCapturedPawnIndex = getEnPassantCapturedPieceIndex(
        endPos,
        piece.color
      );
      removePieceFromBoard(opponentCapturedPawnIndex);
    }

    // Set or clear gameState en passant state
    if (isPawnAdvancingTwoSquares(startPos, endPos)) {
      gameState.updateEnPassantSquare(
        getSquareIndexByRankAndFile(
          (getPieceRank(startPos) +
            (piece.color === PieceColor.WHITE ? 1 : -1)) as PieceRank,
          getPieceFile(startPos)
        )
      );
    } else gameState.updateEnPassantSquare(null);

    // Handle pawn promotion logic
    if (isMovePawnPromotion(endPos)) {
      const input = prompt('Promote your pawn');
      if (!input || piece.color === null) return;

      const newPiece = convertStringToPiece(input, piece.color);
      setBoard((prevBoard) => {
        const copy = [...prevBoard];
        copy[endPos].piece = newPiece;
        return copy;
      });
    }
  }

  function removePieceFromBoard(index: number) {
    setBoard((prevBoard) => {
      const copy = [...prevBoard];
      copy[index].piece = null;
      return copy;
    });
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
    removePieceFromBoard,
  };
}
