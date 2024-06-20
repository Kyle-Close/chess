import { BoardState, Piece } from '../../../context/board/InitialState';
import { PieceType } from '../../../enums/PieceType';
import { filterCheckMoves } from './filterCheckMoves';
import { bishopMoveValidation } from './bishopMoveValidation';
import { ValidMoves, kingMoveValidation } from './kingMoveValidation';
import { knightMoveValidation } from './knightMoveValidation';
import { pawnMoveValidation } from './pawnMoveValidation';
import { queenMoveValidation } from './queenMoveValidation';
import { rookMoveValidation } from './rookMoveValidation';

export function validatePieceMove(board: BoardState, piece: Piece, currentIndex: number) {
  if (piece === null) return;
  const pieceType = piece.type;
  const color = piece.color;
  if (color === null) return [];
  let validMoves: ValidMoves[] = [];

  if (pieceType === PieceType.PAWN) validMoves = pawnMoveValidation(board, piece, currentIndex);
  else if (pieceType === PieceType.ROOK)
    validMoves = rookMoveValidation(board, piece, currentIndex);
  else if (pieceType === PieceType.KNIGHT)
    validMoves = knightMoveValidation(board, piece, currentIndex);
  else if (pieceType === PieceType.BISHOP)
    validMoves = bishopMoveValidation(board, piece, currentIndex);
  else if (pieceType === PieceType.QUEEN)
    validMoves = queenMoveValidation(board, piece, currentIndex);
  else if (pieceType === PieceType.KING)
    validMoves = kingMoveValidation(board, piece, currentIndex);

  validMoves = filterCheckMoves(validMoves, board, piece, currentIndex);

  return validMoves;
}
