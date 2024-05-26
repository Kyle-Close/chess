import { useContext, useEffect } from 'react';
import { BoardContext } from '../context/board/BoardContext';
import { usePiece } from './usePiece';
import { useStartEndAction } from './useStartEndAction';
import { validatePieceMove } from '../helpers/validations/validatePieceMove';
import { Piece } from '../context/board/InitialState';
import { GameState } from '../context/GameState';
import { isKingInCheck } from '../helpers/board/isKingInCheck';
import { getKingIndex } from '../helpers/board/getKingIndex';
import { copyBoardAndUpdate } from '../helpers/board/copyBoardAndUpdate';

export function useBoard() {
  const { board, setBoard, getPieceAtPosition, clearIsValidSquares } =
    useContext(BoardContext);
  const gameState = useContext(GameState);
  const { move } = usePiece();
  const { setPosition, startPos, endPos, setStartPos, clear } = useStartEndAction();

  function tryMove(piece: Piece, startPos: number, endPos: number) {
    const validMoves = validatePieceMove(board, piece, startPos);
    if (!validMoves || validMoves.length === 0) return;
    if (!validMoves.some((move) => move.index === endPos)) return;

    const capturedPiece = getPieceAtPosition(endPos);

    if (capturedPiece) {
      const currentPlayer = gameState.getCurrentTurnPlayer();
      currentPlayer.enemyPieceCaptured(capturedPiece.type);
    }

    gameState.changeTurn();
    move(piece, startPos, endPos);
  }

  function handleShowValidMoves(startPos: number) {
    const currentPiece = getPieceAtPosition(startPos);
    if (currentPiece) {
      const validMoves = validatePieceMove(board, currentPiece, startPos);
      if (validMoves) {
        setBoard((prevBoard) => {
          const copy = [...prevBoard];
          validMoves.forEach((move) => {
            if (move.isCapture) copy[move.index].isCapture = true;
            copy[move.index].isValidMove = true;
          });
          return copy;
        });
      }
    }
  }

  const handleSquareClicked = (index: number) => {
    const isFinalClick = startPos !== null ? true : false;
    const isValidClick = isClickingValidSquare(index, isFinalClick);
    if (isValidClick) setPosition(index);
  };

  const handleRightClickOnBoard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setStartPos(null);
    clearIsValidSquares();
  };

  const isClickingValidSquare = (index: number, isFinalClick: boolean) => {
    const piece = getPieceAtPosition(index);
    const currentTurnPlayer = gameState.getCurrentTurnPlayer();
    if ((piece && piece.color === currentTurnPlayer.color) || !piece) return true;
    else if (piece && piece.color !== currentTurnPlayer.color && isFinalClick)
      return true;
    else return false;
  };

  useEffect(() => {
    if (startPos === null) clearIsValidSquares();
    else if (startPos !== null && endPos === null) {
      if (isClickingValidSquare(startPos, true)) handleShowValidMoves(startPos);
    } else if (startPos !== null && endPos !== null) {
      const piece = getPieceAtPosition(startPos);
      if (piece) tryMove(piece, startPos, endPos);
      clear();
    }
  }, [startPos, endPos]);

  return {
    board,
    startPos,
    handleSquareClicked,
    handleRightClickOnBoard,
  };
}
