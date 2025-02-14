import { PieceColor, PieceType } from 'base/features/game-board/hooks/usePiece';
import { filterCheckMoves } from '../piece-validation/filterCheckMoves';
import { ValidMoves } from '../piece-validation/kingMoveValidation';
import { isEnpassantCapturePossible } from '../piece-validation/pawnMoveValidation';
import { getStandardPieceMoves } from './getStandardPieceMoves';
import { CastleRights } from 'base/redux/slices/castleRights';
import { BoardState, Piece } from 'base/context/board/InitialState';

export function calculateAllValidMoves(
  board: BoardState,
  piece: Piece,
  startPos: number,
  castleRights: CastleRights,
  enPassant: number | null
) {
  let validMoves: ValidMoves[] = [];
  let standardMoves = getStandardPieceMoves(board, piece, startPos);
  if (standardMoves && standardMoves.length > 0) validMoves = standardMoves;

  if (enPassant && isEnpassantCapturePossible(piece.color, startPos, enPassant))
    validMoves.push({ index: enPassant, isCapture: true });

  if (validMoves.length == 0) return;

  const canCastleKingSide = castleRights.canCastleKingSide;
  const canCastleQueenSide = castleRights.canCastleQueenSide;

  if (piece.type === PieceType.KING && canCastleKingSide)
    pushKingSideCastleIndex(piece.color, validMoves);
  if (piece.type === PieceType.KING && canCastleQueenSide)
    pushQueenSideCastleIndex(piece.color, validMoves);

  validMoves = filterCheckMoves(validMoves, board, piece, startPos);

  return validMoves;
}

function pushKingSideCastleIndex(color: PieceColor, validMoves: ValidMoves[]) {
  if (color === PieceColor.WHITE) validMoves.push({ index: 62, isCapture: false });
  else validMoves.push({ index: 6, isCapture: false });
}

function pushQueenSideCastleIndex(color: PieceColor, validMoves: ValidMoves[]) {
  if (color === PieceColor.WHITE) validMoves.push({ index: 58, isCapture: false });
  else validMoves.push({ index: 2, isCapture: false });
}
