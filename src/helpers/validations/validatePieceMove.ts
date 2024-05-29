import { BoardState, Piece } from '../../context/board/InitialState';
import { PieceType } from '../../enums/PieceType';
import { filterCheckMoves } from './filterCheckMoves';
import { bishopMoveValidation } from './pieces/bishopMoveValidation';
import { ValidSquares, kingMoveValidation } from './pieces/kingMoveValidation';
import { knightMoveValidation } from './pieces/knightMoveValidation';
import { pawnMoveValidation } from './pieces/pawnMoveValidation';
import { queenMoveValidation } from './pieces/queenMoveValidation';
import { rookMoveValidation } from './pieces/rookMoveValidation';

export function validatePieceMove(board: BoardState, piece: Piece, currentIndex: number) {
  if (piece === null) return;
  const pieceType = piece.type;
  let validMoves: ValidSquares[] = [];

  if (pieceType === PieceType.PAWN)
    validMoves = pawnMoveValidation(board, piece, currentIndex);
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
