import { getPieceFile, getPieceRank } from '../generic/pieceLocation';

export function getSquareAlgebraicNotation(index: number) {
  const file = getPieceFile(index);
  const rank = getPieceRank(index);

  return file + rank;
}
