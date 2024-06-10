import { PieceColor } from '../../enums/PieceColor';

export function getEnPassantCapturedPieceIndex(
  pawnIndexAfterCapture: number,
  attackingPawnColor: PieceColor
) {
  if (attackingPawnColor === PieceColor.WHITE) return pawnIndexAfterCapture - 8;
  else return pawnIndexAfterCapture + 8;
}
