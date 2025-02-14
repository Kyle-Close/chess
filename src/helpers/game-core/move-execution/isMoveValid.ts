import { CastleRights } from 'base/redux/slices/castleRights';
import { calculateAllValidMoves } from './calculateAllValidMoves';
import { BoardState, Piece } from 'base/context/board/InitialState';

export function isMoveValid(
  board: BoardState,
  piece: Piece,
  startPos: number,
  endPos: number,
  castleRights: CastleRights,
  enPassantSquare: number | null
) {
  const validMoves = calculateAllValidMoves(board, piece, startPos, castleRights, enPassantSquare);
  if (!validMoves || validMoves.length === 0) return false;
  if (!validMoves.some((move) => move.index === endPos)) return false;
  return true;
}
