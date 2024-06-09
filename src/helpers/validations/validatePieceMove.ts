import { BoardState, Piece } from '../../context/board/InitialState';
import { PieceColor } from '../../enums/PieceColor';
import { PieceType } from '../../enums/PieceType';
import { CastleRights } from '../../hooks/useCastleRights';
import { filterCheckMoves } from './filterCheckMoves';
import { bishopMoveValidation } from './pieces/bishopMoveValidation';
import { ValidSquares, kingMoveValidation } from './pieces/kingMoveValidation';
import { knightMoveValidation } from './pieces/knightMoveValidation';
import { pawnMoveValidation } from './pieces/pawnMoveValidation';
import { queenMoveValidation } from './pieces/queenMoveValidation';
import { rookMoveValidation } from './pieces/rookMoveValidation';

export function validatePieceMove(
  board: BoardState,
  piece: Piece,
  currentIndex: number,
  castleRights?: CastleRights,
  enPassantTargetSquare?: number | null
) {
  if (piece === null) return;
  const pieceType = piece.type;
  const color = piece.color;
  if (color === null) return [];
  let validMoves: ValidSquares[] = [];

  if (pieceType === PieceType.PAWN)
    validMoves = pawnMoveValidation(board, piece, currentIndex, enPassantTargetSquare);
  else if (pieceType === PieceType.ROOK)
    validMoves = rookMoveValidation(board, piece, currentIndex);
  else if (pieceType === PieceType.KNIGHT)
    validMoves = knightMoveValidation(board, piece, currentIndex);
  else if (pieceType === PieceType.BISHOP)
    validMoves = bishopMoveValidation(board, piece, currentIndex);
  else if (pieceType === PieceType.QUEEN)
    validMoves = queenMoveValidation(board, piece, currentIndex);
  else if (pieceType === PieceType.KING) {
    validMoves = kingMoveValidation(board, piece, currentIndex);
    if (castleRights?.canCastleKingSide)
      validMoves = pushKingSideCastleIndex(color, validMoves);
    if (castleRights?.canCastleQueenSide)
      validMoves = pushQueenSideCastleIndex(color, validMoves);
  }

  validMoves = filterCheckMoves(validMoves, board, piece, currentIndex);

  return validMoves;
}

function pushKingSideCastleIndex(color: PieceColor, validMoves: ValidSquares[]) {
  if (color === PieceColor.WHITE) return [...validMoves, { index: 6, isCapture: false }];
  else return [...validMoves, { index: 62, isCapture: false }];
}

function pushQueenSideCastleIndex(color: PieceColor, validMoves: ValidSquares[]) {
  if (color === PieceColor.WHITE) return [...validMoves, { index: 2, isCapture: false }];
  else return [...validMoves, { index: 58, isCapture: false }];
}
