import { BoardState } from '../../context/board/InitialState';
import { PieceColor } from '../../enums/PieceColor';
import { scanRank } from '../scan/scanRank';
import { scanRankForCheck } from './scanRankForCheck';

export function isKingInCheck(
  board: BoardState,
  currentKingIndex: number,
  color: PieceColor
) {
  // scan the entire board for check on king. check for only WHITE or BLACK (passed in)
  let isCheck = false;
  const opponentColor = color === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

  const scannedRank = scanRank(board, currentKingIndex);
  if (scanRankForCheck(scannedRank, opponentColor)) isCheck = true;

  //const scannedFile = scanFile();

  return isCheck;
}
