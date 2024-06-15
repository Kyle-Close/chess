import { Piece } from '../../context/board/InitialState';

export function isMoveEnPassant(
  piece: Piece,
  endPos: number,
  enPassantSquare: number | null
) {
  if (!enPassantSquare) return false;
  if (endPos === enPassantSquare && piece.color !== null) return true;
  return false;
}
