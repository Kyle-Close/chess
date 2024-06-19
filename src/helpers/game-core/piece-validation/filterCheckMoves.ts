import { BoardState, Piece } from '../../../context/board/InitialState';
import { copyBoardAndUpdate } from '../board-utility/copyBoardAndUpdate';
import { getKingIndex } from '../../analysis/game-checks/getKingIndex';
import { isKingInCheck } from '../../analysis/game-checks/isKingInCheck';
import { ValidMoves } from './kingMoveValidation';

export function filterCheckMoves(
  validMoves: ValidMoves[],
  board: BoardState,
  pieceToMove: Piece,
  currentPiecePos: number
) {
  const playerColor = pieceToMove.color;
  if (playerColor === null) return validMoves;

  return validMoves.filter((square) => {
    const boardStateAfterMove = copyBoardAndUpdate(
      board,
      pieceToMove,
      currentPiecePos,
      square.index
    );

    const currentKingIndex = getKingIndex(boardStateAfterMove, playerColor);
    return !isKingInCheck(boardStateAfterMove, currentKingIndex, playerColor);
  });
}
