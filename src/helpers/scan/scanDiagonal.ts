import { BoardState } from '../../context/board/InitialState';
import { getDiagonalStartIndex } from '../board/getDiagonalStartIndex';
import { getPieceFile } from '../generic/pieceLocation';
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

  // Handle top left to bottom right case.
  let nextIndex = startIndex;
  while (true) {
    nextIndex = nextIndex + 9;
    if (nextIndex > 63) break;
    const file = getPieceFile(nextIndex);
    result.push(board[nextIndex].piece);
    if (file === 'h') break;
  }

  return result;
}
