import { BoardState } from "base/data/getInitialBoardState";

export function getCapturedPiece(board: BoardState, endPos: number) {
  const captureSquare = board[endPos];

  if (captureSquare.piece === null) return null;
  return captureSquare.piece;
}
