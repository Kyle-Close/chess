import { SquareFile, SquareRank } from "base/features/game-board/hooks/useSquare";
import { translatePositionToIndex } from "base/features/game-board/utils/board-utility/translatePositionToIndex";

export function getEnPassantTargetSquareFromFen(fenEnPassantValue: string) {
  if (fenEnPassantValue === '-') return null;
  const file = fenEnPassantValue[0] as SquareFile;
  const rank = Number(fenEnPassantValue[1]) as SquareRank;
  return translatePositionToIndex(rank, file);
}
