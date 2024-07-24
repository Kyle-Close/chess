import { BoardState, Piece } from '../../../context/board/InitialState';
import { CastleRights } from '../../../redux/slices/castleRights';
import { calculateAllValidMoves } from './calculateAllValidMoves';

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
