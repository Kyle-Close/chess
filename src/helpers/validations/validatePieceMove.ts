import { BoardState, Piece } from '../../context/board/InitialState';
import { PieceType } from '../../enums/PieceType';
import { bishopMoveValidation } from './pieces/bishopMoveValidation';
import { knightMoveValidation } from './pieces/knightMoveValidation';
import { pawnMoveValidation } from './pieces/pawnMoveValidation';
import { rookMoveValidation } from './pieces/rookMoveValidation';

export function validatePieceMove(board: BoardState, piece: Piece, currentIndex: number) {
  if (piece === null) return;

  if (piece.type === PieceType.PAWN)
    return pawnMoveValidation(board, piece, currentIndex);
  else if (piece.type === PieceType.ROOK)
    return rookMoveValidation(board, piece, currentIndex);
  else if (piece.type === PieceType.KNIGHT)
    return knightMoveValidation(board, piece, currentIndex);
  else if (piece.type === PieceType.BISHOP)
    return bishopMoveValidation(board, piece, currentIndex);
}
