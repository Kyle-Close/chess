import { PieceColor } from '../../enums/PieceColor';
import { PieceType } from '../../enums/PieceType';
import { ScanResult } from './scanRank';

export function scanRankForCheck(rankScan: ScanResult[], opponentPieceColor: PieceColor) {
  let isCheck = false;

  // scan left side for unubstructed rook or queen
  for (let i = 0; i < 8; i++) {
    if (rankScan[i]?.color !== opponentPieceColor && rankScan[i]?.type === PieceType.KING)
      break;
    if (rankScan[i] === null) continue;
    else if (rankScan[i] && rankScan[i]?.color !== opponentPieceColor) isCheck = false;
    else if (
      (rankScan[i]?.type === PieceType.QUEEN &&
        rankScan[i]?.color === opponentPieceColor) ||
      (rankScan[i]?.type === PieceType.ROOK && rankScan[i]?.color === opponentPieceColor)
    )
      isCheck = true;
  }

  // scan right side for unubstructed rook or queen
  for (let i = 7; i >= 0; i--) {
    if (rankScan[i]?.color !== opponentPieceColor && rankScan[i]?.type === PieceType.KING)
      break;
    if (rankScan[i] === null) continue;
    else if (rankScan[i] && rankScan[i]?.color !== opponentPieceColor) isCheck = false;
    else if (
      (rankScan[i]?.type === PieceType.QUEEN &&
        rankScan[i]?.color === opponentPieceColor) ||
      (rankScan[i]?.type === PieceType.ROOK && rankScan[i]?.color === opponentPieceColor)
    )
      isCheck = true;
  }
  return isCheck;
}
