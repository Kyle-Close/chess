import { Piece } from '../../../../context/board/InitialState';
import { PieceType } from '../../../../enums/PieceType';

export function isHalfMoveResetCondition(piece: Piece, isCapture: boolean) {
  if (piece.type === PieceType.PAWN || isCapture) return true;
  return false;
}
