import { BoardState } from '../../context/board/InitialState';
import { getFileStartIndex } from '../board-management/getFileStartIndex';
import { ScanResult } from './scanRank';

export function scanFile(board: BoardState, currentIndex: number) {
  // This function returns the current state of only the file (column),
  //  of the passed in index.
  let startIndex = getFileStartIndex(currentIndex);
  const result: ScanResult[] = [];

  for (let i = 0; i < 8; i++) {
    result.push(board[startIndex].piece);
    startIndex = startIndex + 8;
  }

  return result;
}
