import { BoardState } from '../../../context/board/InitialState';

export function clearSquare(board: BoardState, squareIndex: number) {
  board[squareIndex].isCapture = false;
  board[squareIndex].isValidMove = false;
  board[squareIndex].piece = null;
}
