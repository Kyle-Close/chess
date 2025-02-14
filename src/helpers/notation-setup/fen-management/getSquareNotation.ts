import { getSquareFile } from "base/helpers/analysis/board-mapping/getSquareFile";
import { getSquareRank } from "base/helpers/analysis/board-mapping/getSquareRank";

export function getSquareNotation(index: number) {
  const file = getSquareFile(index);
  const rank = getSquareRank(index);
  return file + rank;
}
