import { BoardState, Piece } from '../../context/board/InitialState';
import { copyBoardAndUpdate } from '../board/copyBoardAndUpdate';
import { getKingIndex } from '../board/getKingIndex';
import { isKingInCheck } from '../board/isKingInCheck';
import { ValidSquares } from './pieces/kingMoveValidation';

export function filterCheckMoves(
  validMoves: ValidSquares[],
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
