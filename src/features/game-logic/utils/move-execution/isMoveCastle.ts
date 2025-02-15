import { Piece } from "base/data/getInitialBoardState";
import { PieceColor, PieceType } from "base/features/game-board/hooks/usePiece";

export function isMoveCastle(piece: Piece, startPos: number, endPos: number) {
  if (piece.type !== PieceType.KING) return false;
  const color = piece.color;

  const squaresMoved = Math.abs(startPos - endPos);
  if (squaresMoved !== 2) return false;

  if (color === PieceColor.WHITE) {
    if (endPos === 58 || endPos === 62) return true;
  } else {
    if (endPos === 2 || endPos === 6) return true;
  }

  return false;
}
