import { useContext, useEffect, useRef } from 'react';
import { BoardContext } from '../context/board/BoardContext';
import { usePiece } from './usePiece';
import { useStartEndAction } from './useStartEndAction';
import { validatePieceMove } from '../helpers/validations/validatePieceMove';

export function useBoard() {
  const { board, setBoard, getPieceAtPosition, clearIsValidSquares } =
    useContext(BoardContext);
  const { move } = usePiece();
  const { setPosition, startPos, endPos, setStartPos, clear } =
    useStartEndAction();

  function handleShowValidMoves(startPos: number) {
    const currentPiece = getPieceAtPosition(startPos);
    if (currentPiece) {
      const validMoves = validatePieceMove(currentPiece, startPos);
      if (validMoves) {
        setBoard((prevBoard) => {
          const copy = [...prevBoard];
          validMoves.forEach((index) => {
            copy[index].isValidMove = true;
          });
          return copy;
        });
      }
    }
  }

  const handleSquareClicked = (index: number) => {
    setPosition(index);
  };

  const handleRightClickOnBoard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setStartPos(null);
    clearIsValidSquares();
  };

  useEffect(() => {
    if (startPos === null) clearIsValidSquares();
    else if (startPos !== null && endPos === null)
      handleShowValidMoves(startPos);
    else if (startPos !== null && endPos !== null) {
      const piece = getPieceAtPosition(startPos);
      if (piece) move(piece, startPos, endPos);
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
