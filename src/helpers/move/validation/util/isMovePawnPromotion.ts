import { Piece } from '../../../../context/board/InitialState';
import { PieceType } from '../../../../enums/PieceType';
import { getPieceRank } from '../../../generic/pieceLocation';

export function isMovePawnPromotion(piece: Piece, pawnIndex: number) {
  if (piece.type !== PieceType.PAWN) return false;
  const rank = getPieceRank(pawnIndex);
  return rank === 1 || rank === 8;
}
