import { BoardState } from '../../../context/board/InitialState';
import { getDiagonalStartIndex } from '../../game-core/board-utility/getDiagonalStartIndex';
import { getPieceFile } from '../../generic/pieceLocation';
import { ScanResult } from './scanRank';

export function scanDiagonal(
  board: BoardState,
  currentIndex: number,
  isDiagonalA: boolean
) {
  // This function returns the current state of only the diagonal,
  //  of the passed in index. Either top L to bottom R or Bottom left to top right
  const startIndex = isDiagonalA
    ? getDiagonalStartIndex(currentIndex, true)
    : getDiagonalStartIndex(currentIndex, false);
  const result: ScanResult[] = [board[startIndex].piece];

  if (isDiagonalA) {
    // Handle top left to bottom right case.
    let nextIndex = startIndex;
    while (true) {
      nextIndex = nextIndex + 9;
      if (nextIndex > 63) break;
      const file = getPieceFile(nextIndex);
      result.push(board[nextIndex].piece);
      if (file === 'h') break;
    }
  } else {
    // Handle top right to bottom left case
    let nextIndex = startIndex;
    while (true) {
      nextIndex = nextIndex + 7;
      if (nextIndex > 63) break;
      const file = getPieceFile(nextIndex);
      result.push(board[nextIndex].piece);
      if (file === 'a') break;
    }
  }

  return result;
}
