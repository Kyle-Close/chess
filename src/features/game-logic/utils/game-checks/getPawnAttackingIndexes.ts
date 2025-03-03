import { PieceColor } from "base/features/game-board/hooks/usePiece";
import { getSquareFile } from "base/features/game-board/utils/board-utility/getSquareFile";

export function getPawnAttackingIndexes(currentIndex: number, color: PieceColor) {
  const attackingSquares: number[] = [];
  const file = getSquareFile(currentIndex);

  if (file === 'a') {
    if (color === PieceColor.WHITE) attackingSquares.push(currentIndex - 7);
    else attackingSquares.push(currentIndex + 9);
  } else if (file === 'h') {
    if (color === PieceColor.WHITE) attackingSquares.push(currentIndex - 9);
    else attackingSquares.push(currentIndex + 7);
  } else {
    if (color === PieceColor.WHITE) {
      attackingSquares.push(currentIndex - 7);
      attackingSquares.push(currentIndex - 9);
    } else {
      attackingSquares.push(currentIndex + 7);
      attackingSquares.push(currentIndex + 9);
    }
  }

  return attackingSquares;
}
