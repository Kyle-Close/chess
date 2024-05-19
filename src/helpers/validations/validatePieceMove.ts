import { BoardState, Piece } from '../../context/board/InitialState';
import { PieceType } from '../../enums/PieceType';
import { pawnMoveValidation } from './pieces/pawnMoveValidation';
import { rookMoveValidation } from './pieces/rookMoveValidation';

export function validatePieceMove(
  board: BoardState,
  piece: Piece,
  currentIndex: number
) {
  if (piece === null) return;

  if (piece.type === PieceType.PAWN)
    return pawnMoveValidation(board, piece, currentIndex);
  else if (piece.type === PieceType.ROOK)
    return rookMoveValidation(board, piece, currentIndex);
}
