import { getSquareFile } from "base/features/game-board/utils/board-utility/getSquareFile";
import { getSquareRank } from "base/features/game-board/utils/board-utility/getSquareRank";

export function getSquareAlgebraicNotation(index: number) {
  const file = getSquareFile(index);
  const rank = getSquareRank(index);

  return file + rank;
}
