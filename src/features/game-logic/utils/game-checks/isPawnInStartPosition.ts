import { PieceColor } from "base/features/game-board/hooks/usePiece";

export function isPawnInStartPosition(color: PieceColor, currentPos: number) {
  if (color === PieceColor.WHITE) {
    if (currentPos >= 8 && currentPos <= 15) return true;
    else return false;
  } else {
    if (currentPos >= 48 && currentPos <= 55) return true;
    else return false;
  }
}
