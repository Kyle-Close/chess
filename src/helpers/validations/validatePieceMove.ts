import { BoardState, Piece } from '../../context/board/InitialState';
import { PieceType } from '../../enums/PieceType';
import { pawnMoveValidation } from './pieces/pawnMoveValidation';

export function validatePieceMove(
  board: BoardState,
  piece: Piece,
  currentIndex: number
) {
  if (piece === null) return;

  if (piece.type === PieceType.PAWN)
    return pawnMoveValidation(board, piece, currentIndex);
}
