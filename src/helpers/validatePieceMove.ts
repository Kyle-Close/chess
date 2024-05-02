import { Piece } from '../context/board/InitialState';
import { PieceType } from '../enums/PieceType';
import { PawnMoveValidation } from './pieces/pawn/moveValidation';

export function validatePieceMove(
  currentSelectedPiece: Piece | null,
  currentIndex: number
) {
  if (currentSelectedPiece === null) return;

  if (currentSelectedPiece.type === PieceType.PAWN) {
    const validMoves = PawnMoveValidation(currentSelectedPiece, currentIndex);
    console.log('valid pawn moves: ', validMoves);
  }

  return {};
}
