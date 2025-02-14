import { Piece } from "base/context/board/InitialState";
import { PieceType } from "base/features/game-board/hooks/usePiece";

export function isHalfMoveResetCondition(piece: Piece, isCapture: boolean) {
  if (piece.type === PieceType.PAWN || isCapture) return true;
  return false;
}
