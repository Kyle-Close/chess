import { BoardState, Piece } from '../../context/board/InitialState';
import { getRankStartIndex } from '../game-core/board-utility/getRankStartIndex';

export type ScanResult = Piece | null;

export function scanRank(board: BoardState, currentIndex: number) {
  // This function returns the current state of only the rank (row),
  //  of the passed in index.
  const startIndex = getRankStartIndex(currentIndex);
  const result: ScanResult[] = [];

  for (let i = 0; i < 8; i++) {
    result.push(board[startIndex + i].piece);
  }

  return result;
}
