import { ValidMoves } from './kingMoveValidation';
import { executeMove } from '../move-execution/executeMove';
import { BoardState, Piece } from 'base/data/getInitialBoardState';
import { getKingIndex } from '../game-checks/getKingIndex';
import { isKingInCheck } from '../game-checks/isKingInCheck';

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
