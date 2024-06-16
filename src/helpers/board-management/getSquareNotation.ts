import { getPieceFile, getPieceRank } from '../generic/pieceLocation';

export function getSquareNotation(index: number) {
  const file = getPieceFile(index);
  const rank = getPieceRank(index);
  return file + rank;
}
