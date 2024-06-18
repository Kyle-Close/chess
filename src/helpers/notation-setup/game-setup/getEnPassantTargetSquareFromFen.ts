import { translatePositionToIndex } from '../../game-core/board-utility/translatePositionToIndex';
import { PieceFile } from '../../analysis/game-checks/pieceLocation';
import { SquareRank } from '../../../enums/SquareRank';

export function getEnPassantTargetSquareFromFen(fenEnPassantValue: string) {
  if (fenEnPassantValue === '-') return null;
  const file = fenEnPassantValue[0] as PieceFile;
  const rank = Number(fenEnPassantValue[1]) as SquareRank;
  return translatePositionToIndex(rank, file);
}
