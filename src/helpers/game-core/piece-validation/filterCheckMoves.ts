import { BoardState, Piece } from '../../../context/board/InitialState';
import { getKingIndex } from '../../analysis/game-checks/getKingIndex';
import { isKingInCheck } from '../../analysis/game-checks/isKingInCheck';
import { ValidMoves } from './kingMoveValidation';
import { executeMove } from '../move-execution/executeMove';

export function filterCheckMoves(
  validMoves: ValidMoves[],
  board: BoardState,
  pieceToMove: Piece,
  currentPiecePos: number
) {
  const playerColor = pieceToMove.color;
  if (playerColor === null) return validMoves;

  return validMoves.filter((target) => {
    const boardPostMove = executeMove(board, currentPiecePos, target.index, true);
    if (!boardPostMove) return false;

    const currentKingIndex = getKingIndex(boardPostMove, playerColor);
    const isInCheck = isKingInCheck(boardPostMove, currentKingIndex, playerColor);

    return !isInCheck;
  });
}
