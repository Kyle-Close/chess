import { Piece } from '../context/board/InitialState';
import { PieceType } from '../enums/PieceType';

export function validatePieceMove(currentSelectedPiece: Piece | null) {
  if (currentSelectedPiece === null) return;

  if (currentSelectedPiece.type === PieceType.PAWN) {
    console.log('Moving pawn: ', currentSelectedPiece);
  }

  return {};
}
