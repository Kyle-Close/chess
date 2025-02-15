import { BoardState } from 'base/data/getInitialBoardState';
import { PieceColor, PieceType } from 'base/features/game-board/hooks/usePiece';
import { getSquareFile } from '../board-utility/getSquareFile';

export function scanForKnightCheck(
  board: BoardState,
  currentKingPosition: number,
  opponentColor: PieceColor
) {
  const kingFile = getSquareFile(currentKingPosition);
  const possibleCheckSquares: number[] = [];

  if (kingFile === 'a') {
    // don't include -10, +6, -17 or +15
    addIndexToPossibleCheckSquares(-15, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(-6, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(10, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(17, possibleCheckSquares, currentKingPosition);
  } else if (kingFile === 'b') {
    // don't include -10 or +6
    addIndexToPossibleCheckSquares(-17, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(-15, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(-6, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(10, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(17, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(15, possibleCheckSquares, currentKingPosition);
  } else if (kingFile === 'g') {
    // don't include -6 or +10
    addIndexToPossibleCheckSquares(-17, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(-15, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(17, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(15, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(6, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(-10, possibleCheckSquares, currentKingPosition);
  } else if (kingFile === 'h') {
    // don't include -6, +10, -15 or +17
    addIndexToPossibleCheckSquares(-17, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(15, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(6, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(-10, possibleCheckSquares, currentKingPosition);
  } else {
    addIndexToPossibleCheckSquares(-17, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(-15, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(17, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(15, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(6, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(-10, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(-6, possibleCheckSquares, currentKingPosition);
    addIndexToPossibleCheckSquares(10, possibleCheckSquares, currentKingPosition);
  }

  let isCheck = false;

  possibleCheckSquares.forEach((index) => {
    const piece = board[index].piece;
    if (piece === null) return;

    if (piece.type === PieceType.KNIGHT && piece.color === opponentColor) {
      isCheck = true;
    }
  });

  return isCheck;
}

function addIndexToPossibleCheckSquares(
  index: number,
  possibleSquares: number[],
  currentKingIndex: number
) {
  const newIndex = currentKingIndex + index;
  if (newIndex >= 0 && newIndex <= 63) {
    possibleSquares.push(newIndex);
  }
}
