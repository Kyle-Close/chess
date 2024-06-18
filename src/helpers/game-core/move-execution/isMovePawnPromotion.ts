import { Piece } from '../../../context/board/InitialState';
import { PieceType } from '../../../enums/PieceType';
import { getSquareRank } from '../../analysis/board-mapping/getSquareRank';

export function isMovePawnPromotion(piece: Piece, pawnIndex: number) {
  if (piece.type !== PieceType.PAWN) return false;
  const rank = getSquareRank(pawnIndex);
  return rank === 1 || rank === 8;
}
