import { BoardState, Piece } from '../../context/board/InitialState';
import { getRankStartIndex } from '../board/getRankStartIndex';

export type RankScanResult = Piece | null;

export function scanRank(board: BoardState, currentIndex: number) {
  // This function returns the current state of only the rank (row),
  //  of the passed in index.
  const startIndex = getRankStartIndex(currentIndex);
  const result: RankScanResult[] = [];
  console.log(startIndex);

  for (let i = 0; i < 8; i++) {
    result.push(board[startIndex + i].piece);
  }

  return result;
}
