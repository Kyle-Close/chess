import { useContext, useEffect } from 'react';
import { BoardContext } from '../context/board/BoardContext';
import { usePiece } from './usePiece';
import { useStartEndAction } from './useStartEndAction';
import { validatePieceMove } from '../helpers/validations/validatePieceMove';
import { Piece } from '../context/board/InitialState';
import { GameState } from '../context/GameState';

export function useBoard() {
  const { board, setBoard, getPieceAtPosition, clearIsValidSquares } =
    useContext(BoardContext);
  const gameState = useContext(GameState);
  const { move } = usePiece();
  const { setPosition, startPos, endPos, setStartPos, clear } = useStartEndAction();

  function tryMove(piece: Piece, startPos: number, endPos: number) {
    if (gameState.turn === 1) console.log('player 1 turn');
    const validMoves = validatePieceMove(board, piece, startPos);
    if (!validMoves || validMoves.length === 0) return;
    if (!validMoves.some((move) => move.index === endPos)) return;

    move(piece, startPos, endPos);
    gameState.changeTurn();
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
    // Player should only be able to select their own piece or a blank square.
    // They can only select enemy piece if it's a capture move
    const piece = getPieceAtPosition(index);
    const currentPlayerTurnColor = gameState.getCurrentTurnPlayerColor();
    if ((piece && piece.color === currentPlayerTurnColor) || !piece) return true;
    else if (piece && piece.color !== currentPlayerTurnColor && isFinalClick) return true;
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
