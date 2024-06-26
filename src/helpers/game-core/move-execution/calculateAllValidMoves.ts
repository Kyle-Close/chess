import { BoardState, Piece } from '../../../context/board/InitialState';
import { GameState } from '../../../context/game-state/GameState';
import { PieceColor } from '../../../enums/PieceColor';
import { PieceType } from '../../../enums/PieceType';
import { filterCheckMoves } from '../piece-validation/filterCheckMoves';
import { ValidMoves } from '../piece-validation/kingMoveValidation';
import { isEnpassantCapturePossible } from '../piece-validation/pawnMoveValidation';
import { getStandardPieceMoves } from './getStandardPieceMoves';

export function calculateAllValidMoves(
  board: BoardState,
  piece: Piece,
  startPos: number,
  gameState: GameState
) {
  let validMoves = getStandardPieceMoves(board, piece, startPos);
  if (!validMoves) return;

  const currentPlayer = gameState.isWhiteTurn ? gameState.whitePlayer : gameState.blackPlayer;
  const canCastleKingSide = currentPlayer.castleRights.castleRights.canCastleKingSide;
  const canCastleQueenSide = currentPlayer.castleRights.castleRights.canCastleQueenSide;
  const enPassant = gameState.enPassantSquare;

  if (piece.type === PieceType.KING && canCastleKingSide)
    pushKingSideCastleIndex(piece.color, validMoves);
  if (piece.type === PieceType.KING && canCastleQueenSide)
    pushQueenSideCastleIndex(piece.color, validMoves);

  if (enPassant && isEnpassantCapturePossible(piece.color, startPos, enPassant))
    validMoves.push({ index: enPassant, isCapture: true });

  validMoves = filterCheckMoves(validMoves, board, piece, startPos);

  return validMoves;
}

function pushKingSideCastleIndex(color: PieceColor, validMoves: ValidMoves[]) {
  if (color === PieceColor.WHITE) validMoves.push({ index: 6, isCapture: false });
  else validMoves.push({ index: 62, isCapture: false });
}

function pushQueenSideCastleIndex(color: PieceColor, validMoves: ValidMoves[]) {
  if (color === PieceColor.WHITE) validMoves.push({ index: 2, isCapture: false });
  else validMoves.push({ index: 58, isCapture: false });
}
