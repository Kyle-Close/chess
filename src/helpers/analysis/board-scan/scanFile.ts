import { getFileStartIndex } from 'base/helpers/game-core/board-utility/getFileStartIndex';
import { ScanResult } from './scanRank';
import { BoardState } from 'base/context/board/InitialState';

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
