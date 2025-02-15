import { getSquareAlgebraicNotation } from "../notations/getSquareAlgebraicNotation";

export function buildEnPassantForFen(enPassantSquareIndex: number | null) {
  if (!enPassantSquareIndex) return '-';
  return getSquareAlgebraicNotation(enPassantSquareIndex);
}
