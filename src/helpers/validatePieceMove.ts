import { Pieces } from '../enums/Pieces';

export function validatePieceMove(currentSelectedPiece: Pieces | null) {
  if (currentSelectedPiece === null) return;

  if (
    currentSelectedPiece === Pieces.PAWN_WH ||
    currentSelectedPiece === Pieces.PAWN_BL
  ) {
    console.log('Moving pawn: ', currentSelectedPiece);
  }

  return {};
}
