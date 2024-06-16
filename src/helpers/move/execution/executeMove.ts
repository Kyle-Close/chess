import { BoardState } from '../../../context/board/InitialState';

export function executeMove(board: BoardState, startPos: number, endPos: number) {
  const startSquare = board[startPos];
  const endSquare = board[endPos];

  if (startSquare.piece === null) return;

  startSquare.piece.hasMoved = true;

  endSquare.isCapture = false;
  endSquare.isValidMove = false;
  endSquare.piece = board[startPos].piece;

  startSquare.isCapture = false;
  startSquare.isValidMove = false;
  startSquare.piece = null;
}
