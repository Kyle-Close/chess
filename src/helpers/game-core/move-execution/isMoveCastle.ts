import { Piece } from '../../../context/board/InitialState';
import { PieceColor } from '../../../enums/PieceColor';
import { PieceType } from '../../../enums/PieceType';

export function isMoveCastle(piece: Piece, startPos: number, endPos: number) {
  if (piece.type !== PieceType.KING) return false;
  const color = piece.color;

  const squaresMoved = Math.abs(startPos - endPos);
  if (squaresMoved !== 2) return false;

  if (color === PieceColor.WHITE) {
    if (endPos === 6 || endPos === 2) return true;
  } else {
    if (endPos === 62 || endPos === 58) return true;
  }

  return false;
}

// white king start pos : 4
//    king side end pos : 6
//    queen side end pos: 2

// black king start pos : 60
//    king side end pos : 62
//    queen side end pos: 58
