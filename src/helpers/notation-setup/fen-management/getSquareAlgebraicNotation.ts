import { getPieceFile, getPieceRank } from '../../analysis/game-checks/pieceLocation';

export function getSquareAlgebraicNotation(index: number) {
  const file = getPieceFile(index);
  const rank = getPieceRank(index);

  return file + rank;
}
