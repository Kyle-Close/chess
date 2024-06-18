import { getPieceRank } from '../../analysis/game-checks/pieceLocation';

export function isPawnAdvancingTwoSquares(startIndex: number, endIndex: number) {
  const startRank = getPieceRank(startIndex);
  const endRank = getPieceRank(endIndex);

  if (startRank === 2 && endRank === 4) return true;
  else if (startRank === 7 && endRank === 5) return true;
  else return false;
}
