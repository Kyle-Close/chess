import { getSquareRank } from "base/helpers/analysis/board-mapping/getSquareRank";

export function isPawnAdvancingTwoSquares(startIndex: number, endIndex: number) {
  const startRank = getSquareRank(startIndex);
  const endRank = getSquareRank(endIndex);

  if (startRank === 2 && endRank === 4) return true;
  else if (startRank === 7 && endRank === 5) return true;
  else return false;
}
