import { BoardState, Piece } from '../../context/board/InitialState';
import { CastleRights } from '../../hooks/useCastleRights';
import { validatePieceMove } from '../validations/validatePieceMove';

export function isValidMove(
  board: BoardState,
  piece: Piece,
  startPos: number,
  endPos: number,
  castleRights: CastleRights,
  enPassantSquare: number
) {
  const validMoves = validatePieceMove(
    board,
    piece,
    startPos,
    castleRights,
    enPassantSquare
  );
  if (!validMoves || validMoves.length === 0) return;
  if (!validMoves.some((move) => move.index === endPos)) return;
}
