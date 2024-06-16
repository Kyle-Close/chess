import { getSquareAlgebraicNotation } from '../../board-management/getSquareAlgebraicNotation';

export function buildEnPassantForFen(enPassantSquareIndex: number | null) {
  if (!enPassantSquareIndex) return '-';
  return getSquareAlgebraicNotation(enPassantSquareIndex);
}
