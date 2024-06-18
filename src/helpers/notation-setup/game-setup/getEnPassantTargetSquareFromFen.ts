import { translatePositionToIndex } from '../../game-core/board-utility/translatePositionToIndex';
import { PieceFile, PieceRank } from '../../analysis/game-checks/pieceLocation';

export function getEnPassantTargetSquareFromFen(fenEnPassantValue: string) {
  if (fenEnPassantValue === '-') return null;
  const file = fenEnPassantValue[0] as PieceFile;
  const rank = Number(fenEnPassantValue[1]) as PieceRank;
  return translatePositionToIndex(rank, file);
}
