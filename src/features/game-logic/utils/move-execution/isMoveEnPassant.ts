import { Piece } from "base/data/getInitialBoardState";

export function isMoveEnPassant(
  piece: Piece,
  endPos: number,
  enPassantSquare: number | null
) {
  if (!enPassantSquare) return false;
  if (endPos === enPassantSquare && piece.color !== null) return true;
  return false;
}
