import { BoardState } from '../../context/board/InitialState';
import { PieceColor } from '../../enums/PieceColor';
import { scanDiagonal } from '../scan/scanDiagonal';
import { scanDiagonalForCheck } from '../scan/scanDiagonalForCheck';
import { scanFile } from '../scan/scanFile';
import { scanFileForCheck } from '../scan/scanFileForCheck';
import { scanForKnightCheck } from '../scan/scanForKnightCheck';
import { scanRank } from '../scan/scanRank';
import { scanRankForCheck } from '../scan/scanRankForCheck';

export function isKingInCheck(
  board: BoardState,
  currentKingIndex: number,
  color: PieceColor
) {
  let isCheck = false;
  const opponentColor = color === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

  const scannedRank = scanRank(board, currentKingIndex);
  if (scanRankForCheck(scannedRank, opponentColor)) isCheck = true;

  const scannedFile = scanFile(board, currentKingIndex);
  if (scanFileForCheck(scannedFile, opponentColor)) isCheck = true;

  const scannedDiagonalA = scanDiagonal(board, currentKingIndex, true);
  const scannedDiagonalB = scanDiagonal(board, currentKingIndex, false);

  if (scanDiagonalForCheck(scannedDiagonalA, scannedDiagonalB, opponentColor))
    isCheck = true;

  if (scanForKnightCheck(board, currentKingIndex, opponentColor)) isCheck = true;

  return isCheck;
}
