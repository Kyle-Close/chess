import { BoardState } from "base/data/getInitialBoardState";

export function clearSquare(board: BoardState, squareIndex: number) {
  board[squareIndex].isCapture = false;
  board[squareIndex].isValidMove = false;
  board[squareIndex].piece = null;
}
