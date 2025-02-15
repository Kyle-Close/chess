import { Piece } from "base/data/getInitialBoardState";
import { PieceType } from "base/features/game-board/hooks/usePiece";
import { getSquareRank } from "base/features/game-board/utils/board-utility/getSquareRank";

export function isMovePawnPromotion(piece: Piece, pawnIndex: number) {
  if (piece.type !== PieceType.PAWN) return false;
  const rank = getSquareRank(pawnIndex);
  return rank === 1 || rank === 8;
}
