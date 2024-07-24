import { BoardState } from '../../../context/board/InitialState';
import { PieceColor } from '../../../enums/PieceColor';
import { CastleRights } from '../../../redux/slices/castleRights';
import { calculateAllValidMoves } from '../../game-core/move-execution/calculateAllValidMoves';
import { getRemainingPiecesByColor } from '../../game-core/piece-management/getRemainingPiecesByColor';

export function isStalemate(
  board: BoardState,
  isInCheck: boolean,
  color: PieceColor,
  castleRights: CastleRights,
  enPassantSquare: number | null
) {
  const pieces = getRemainingPiecesByColor(board, color, true);
  const isMoveAvailable = pieces.some((piece) => {
    const pieceAvailableMoves = calculateAllValidMoves(
      board,
      piece,
      piece.index,
      castleRights,
      enPassantSquare
    );
    if (!pieceAvailableMoves || pieceAvailableMoves.length === 0) return false;
    return true;
  });

  if (!isMoveAvailable && !isInCheck) return true;
  return false;
}
