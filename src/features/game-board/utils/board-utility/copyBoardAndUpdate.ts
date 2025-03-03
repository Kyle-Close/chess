import { BoardState, Piece } from "base/data/getInitialBoardState";

export function copyBoardAndUpdate(
  board: BoardState,
  piece: Piece,
  startPos: number,
  endPos: number
) {
  const copy = [...board];
  copy[startPos] = { piece: null, isValidMove: false, isCapture: false };
  copy[endPos] = { piece, isValidMove: false, isCapture: false };
  return copy;
}
