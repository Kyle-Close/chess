import { BoardState, Piece } from '../../../../context/board/InitialState';
import { getKingIndex } from '../../../piece-management/getKingIndex';
import { isKingInCheck } from '../../../game-mechanics/isKingInCheck';
import { executeMove } from '../../execution/executeMove';
import { ValidSquares } from '../pieces/kingMoveValidation';

export function filterCheckMoves(
  validMoves: ValidSquares[],
  board: BoardState,
  pieceToMove: Piece,
  currentPiecePos: number
) {
  const playerColor = pieceToMove.color;
  if (playerColor === null) return validMoves;

  return validMoves.filter((square) => {
    const newBoard = [...board];
    executeMove(newBoard, currentPiecePos, square.index);

    const currentKingIndex = getKingIndex(newBoard, playerColor);
    return !isKingInCheck(newBoard, currentKingIndex, playerColor);
  });
}
