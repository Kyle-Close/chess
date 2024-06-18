import { getSquareRank } from '../../analysis/board-mapping/getSquareRank';
import { getPieceFile } from '../../analysis/game-checks/pieceLocation';

export function getSquareAlgebraicNotation(index: number) {
  const file = getPieceFile(index);
  const rank = getSquareRank(index);

  return file + rank;
}
