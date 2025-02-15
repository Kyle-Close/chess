import { BoardState } from "base/data/getInitialBoardState";
import { PieceColor } from "base/features/game-board/hooks/usePiece";

export function isMoveCapture(
  board: BoardState,
  targetIndex: number,
  opponentColor: PieceColor
) {
  const occupant = board[targetIndex];
  if (occupant.piece === null) return false;

  if (occupant.piece.color === opponentColor) return true;
  else return false;
}
