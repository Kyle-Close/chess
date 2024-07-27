import { Piece } from '../../../context/board/InitialState';
import { PieceColor } from '../../../enums/PieceColor';
import { PieceType } from '../../../enums/PieceType';

export enum CastleMetaData {
  KING_SIDE,
  QUEEN_SIDE,
}

export function getCastleMetaData(piece: Piece, startPos: number, endPos: number): CastleMetaData {
  if (piece.type !== PieceType.KING) throw Error('Called CastleMetaData() when no castle.');

  const color = piece.color;

  const squaresMoved = Math.abs(startPos - endPos);
  if (squaresMoved !== 2) throw Error('Called CastleMetaData() when no castle.');

  if (color === PieceColor.WHITE) {
    if (endPos === 62) return CastleMetaData.KING_SIDE;
    else if (endPos === 58) return CastleMetaData.QUEEN_SIDE;
  } else {
    if (endPos === 6) return CastleMetaData.KING_SIDE;
    else if (endPos === 2) return CastleMetaData.QUEEN_SIDE;
  }

  throw Error('Called CastleMetaData() when no castle.');
}

// white king start pos : 4
//    king side end pos : 6
//    queen side end pos: 2

// black king start pos : 60
//    king side end pos : 62
//    queen side end pos: 58
