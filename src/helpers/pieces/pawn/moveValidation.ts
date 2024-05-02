import { Piece } from '../../../context/board/InitialState';
import { PieceColor } from '../../../enums/PieceColor';

export function PawnMoveValidation(piece: Piece, currentIndex: number) {
  const validIndexes: number[] = [];

  if (!piece.hasMoved) {
    if (piece.color === PieceColor.WHITE) validIndexes.push(currentIndex + 16);
    else validIndexes.push(currentIndex - 16);
  }

  if (piece.color === PieceColor.WHITE) validIndexes.push(currentIndex + 8);
  else validIndexes.push(currentIndex - 8);

  return validIndexes;
}
