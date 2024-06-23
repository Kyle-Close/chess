import { BoardState } from '../../../context/board/InitialState';
import { GameState } from '../../../context/game-state/GameState';
import { PieceColor } from '../../../enums/PieceColor';
import { calculateAllValidMoves } from '../../game-core/move-execution/calculateAllValidMoves';
import { getRemainingPiecesByColor } from '../../game-core/piece-management/getRemainingPiecesByColor';

export function isStalemate(
  board: BoardState,
  gameState: GameState,
  isInCheck: boolean,
  color: PieceColor
) {
  const pieces = getRemainingPiecesByColor(board, color, true);
  const isMoveAvailable = pieces.some((piece) => {
    const pieceAvailableMoves = calculateAllValidMoves(board, piece, piece.index, gameState);
    if (!pieceAvailableMoves || pieceAvailableMoves.length === 0) return false;
    return true;
  });

  if (!isMoveAvailable && !isInCheck) return true;
  return false;
}
