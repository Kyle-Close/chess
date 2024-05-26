import { BoardState } from '../../context/board/InitialState';
import { scanRank } from '../scan/scanRank';

export function isKingInCheck(board: BoardState, currentKingIndex: number) {
  // scan the entire board for check on king. check for only WHITE or BLACK (passed in)
  const scannedRank = scanRank(board, currentKingIndex);
  console.log('Scanned Rank: ', scannedRank);

  return false;
}
