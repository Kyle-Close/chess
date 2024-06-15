import { BoardState } from '../../context/board/InitialState';

export function isMoveCapture(board: BoardState, endPos: number) {
  const endSquare = board[endPos];

  if (endSquare.piece) return true;
  return false;
}
