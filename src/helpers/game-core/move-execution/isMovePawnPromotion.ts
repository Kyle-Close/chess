import { Piece } from "base/context/board/InitialState";
import { PieceType } from "base/features/game-board/hooks/usePiece";
import { getSquareRank } from "base/helpers/analysis/board-mapping/getSquareRank";

export function isMovePawnPromotion(piece: Piece, pawnIndex: number) {
  if (piece.type !== PieceType.PAWN) return false;
  const rank = getSquareRank(pawnIndex);
  return rank === 1 || rank === 8;
}
