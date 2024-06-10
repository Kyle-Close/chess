import { getPieceRank } from '../generic/pieceLocation';

export function isMovePawnPromotion(pawnIndex: number) {
  const rank = getPieceRank(pawnIndex);
  return rank === 1 || rank === 8;
}
