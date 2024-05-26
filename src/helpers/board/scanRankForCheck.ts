import { PieceColor } from '../../enums/PieceColor';
import { RankScanResult } from '../scan/scanRank';

export function scanRankForCheck(
  rankScan: RankScanResult[],
  opponentPieceColor: PieceColor
) {
  // scan left side for unubstructed rook or queen
  let count = 0;
  let isCheck = false;
}
