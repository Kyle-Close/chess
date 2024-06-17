import { PieceColor } from '../../../enums/PieceColor';
import { getPieceFile } from '../../generic/pieceLocation';

export function getPawnAttackingIndexes(currentIndex: number, color: PieceColor) {
  const attackingSquares: number[] = [];
  const file = getPieceFile(currentIndex);

  if (file === 'a') {
    if (color === PieceColor.WHITE) attackingSquares.push(currentIndex + 9);
    else attackingSquares.push(currentIndex - 7);
  } else if (file === 'h') {
    if (color === PieceColor.WHITE) attackingSquares.push(currentIndex + 7);
    else attackingSquares.push(currentIndex - 9);
  } else {
    if (color === PieceColor.WHITE) {
      attackingSquares.push(currentIndex + 7);
      attackingSquares.push(currentIndex + 9);
    } else {
      attackingSquares.push(currentIndex - 7);
      attackingSquares.push(currentIndex - 9);
    }
  }

  return attackingSquares;
}
