import { getSquareFile } from '../../analysis/board-mapping/getSquareFile';
import { getSquareRank } from '../../analysis/board-mapping/getSquareRank';

export function getSquareAlgebraicNotation(index: number) {
  const file = getSquareFile(index);
  const rank = getSquareRank(index);

  return file + rank;
}
