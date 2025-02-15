import { PieceColor } from "base/features/game-board/hooks/usePiece";

export function getEnPassantCapturedPieceIndex(
  pawnIndexAfterCapture: number,
  attackingPawnColor: PieceColor
) {
  if (attackingPawnColor === PieceColor.WHITE) return pawnIndexAfterCapture + 8;
  else return pawnIndexAfterCapture - 8;
}
