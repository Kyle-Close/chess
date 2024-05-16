import { useContext, useRef } from 'react';
import { BoardContext } from '../context/board/BoardContext';
import { usePiece } from './usePiece';
import { useStartEndAction } from './useStartEndAction';

export function useBoard() {
  const { board, getPieceAtPosition, clearIsValidSquares } =
    useContext(BoardContext);
  const { move } = usePiece();

  const { setPosition, startPos, setStartPos } = useStartEndAction(
    (start, end) => {
      const piece = getPieceAtPosition(start);
      if (piece) move(piece, start, end);
    }
  );

  const handleSquareClicked = (index: number) => {
    setPosition(index);
  };

  const handleRightClickOnBoard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setStartPos(null);
    clearIsValidSquares();
  };

  return {
    board,
    startPos,
    handleSquareClicked,
    handleRightClickOnBoard,
  };
}
