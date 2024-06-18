import { getPieceFile, getPieceRank } from '../../analysis/game-checks/pieceLocation';

export function getSquareNotation(index: number) {
  const file = getPieceFile(index);
  const rank = getPieceRank(index);
  return file + rank;
}
