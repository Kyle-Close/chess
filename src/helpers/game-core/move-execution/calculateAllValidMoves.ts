import { BoardState, Piece } from '../../../context/board/InitialState';
import { PieceColor } from '../../../enums/PieceColor';
import { PieceType } from '../../../enums/PieceType';
import { CastleRights } from '../../../redux/slices/castleRights';
import { filterCheckMoves } from '../piece-validation/filterCheckMoves';
import { ValidMoves } from '../piece-validation/kingMoveValidation';
import { isEnpassantCapturePossible } from '../piece-validation/pawnMoveValidation';
import { getStandardPieceMoves } from './getStandardPieceMoves';

export function calculateAllValidMoves(
  board: BoardState,
  piece: Piece,
  startPos: number,
  castleRights: CastleRights,
  enPassant: number | null
) {
  console.log(enPassant);
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
