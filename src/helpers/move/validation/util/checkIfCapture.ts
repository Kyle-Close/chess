import { BoardState } from '../../../../context/board/InitialState';
import { PieceColor } from '../../../../enums/PieceColor';

export function checkIsCapture(
  board: BoardState,
  targetIndex: number,
  opponentColor: PieceColor
) {
  const occupant = board[targetIndex];
  if (occupant.piece === null) return false;

  if (occupant.piece.color === opponentColor) return true;
  else return false;
}
