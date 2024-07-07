import { useContext, useEffect } from 'react';
import { BoardContext } from '../context/board/BoardContext';
import { useStartEndAction } from './useStartEndAction';
import { getInitialBoardState } from '../context/board/InitialState';
import { GameState } from '../context/game-state/GameState';
import { ValidMoves } from '../helpers/game-core/piece-validation/kingMoveValidation';
import { useMove } from './useMove';
import { calculateAllValidMoves } from '../helpers/game-core/move-execution/calculateAllValidMoves';

export function useBoard() {
  const { board, setBoard, getPieceAtPosition, clearIsValidSquares } = useContext(BoardContext);
  const gameState = useContext(GameState);
  const startEnd = useStartEndAction();
  const { tryMove } = useMove();

  const isWhiteTurn = gameState.isWhiteTurn;
  const currentPlayer = isWhiteTurn ? gameState.whitePlayer : gameState.blackPlayer;

  function resetBoard() {
    setBoard(getInitialBoardState());
  }

  function handleShowValidMoves(startPos: number) {
    const currentPiece = getPieceAtPosition(startPos);
    if (currentPiece) {
      const boardCopy = [...board];
      const validMoves = calculateAllValidMoves(boardCopy, currentPiece, startPos, gameState);
      if (validMoves) highlightValidMoves(validMoves);
    }
  }

  function highlightValidMoves(validMoves: ValidMoves[]) {
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
    const isGameStarted = gameState.whitePlayer.isTurn || gameState.blackPlayer.isTurn;
    if (!isGameStarted) return;

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
    // Handle reset - don't show any valid moves
    if (startEnd.startPos === null) clearIsValidSquares();
    // Handle first click - show the valid moves
    else if (startEnd.startPos !== null && startEnd.endPos === null) {
      if (isClickingValidSquare(startEnd.startPos, true)) handleShowValidMoves(startEnd.startPos);
    }

    // Handle move execution
    else if (startEnd.startPos !== null && startEnd.endPos !== null) {
      const piece = getPieceAtPosition(startEnd.startPos);
      if (piece) {
        tryMove(piece, startEnd.startPos, startEnd.endPos);
        startEnd.clear();
      }
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
