import { BoardState, Piece } from '../../../context/board/InitialState';
import { PieceType } from '../../../enums/PieceType';
import { bishopMoveValidation } from '../piece-validation/bishopMoveValidation';
import { ValidMoves, kingMoveValidation } from '../piece-validation/kingMoveValidation';
import { knightMoveValidation } from '../piece-validation/knightMoveValidation';
import { pawnMoveValidation } from '../piece-validation/pawnMoveValidation';
import { queenMoveValidation } from '../piece-validation/queenMoveValidation';
import { rookMoveValidation } from '../piece-validation/rookMoveValidation';

export function getStandardPieceMoves(board: BoardState, piece: Piece, currentIndex: number) {
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

  return validMoves;
}
