import { Piece } from '../../context/board/InitialState';
import { PieceType } from '../../enums/PieceType';

export function isMoveCastle(piece: Piece, startPos: number, endPos: number) {
  if (piece.type !== PieceType.KING) return false;

  // white king start pos : 4
  //    king side end pos : 6
  //    queen side end pos: 2

  // black king start pos : 60
  //    king side end pos : 62
  //    queen side end pos: 58
  const squaresMoved = Math.abs(startPos - endPos);
  return squaresMoved === 2 ? true : false;
}
