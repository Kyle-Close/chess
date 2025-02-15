import { BoardState } from 'base/data/getInitialBoardState';
import { PieceColor } from 'base/features/game-board/hooks/usePiece';
import { scanDiagonal } from 'base/features/game-board/utils/board-scan/scanDiagonal';
import { scanDiagonalForCheck } from 'base/features/game-board/utils/board-scan/scanDiagonalForCheck';
import { scanFile } from 'base/features/game-board/utils/board-scan/scanFile';
import { scanFileForCheck } from 'base/features/game-board/utils/board-scan/scanFileForCheck';
import { scanForEnemyKingWithinOneSquare } from 'base/features/game-board/utils/board-scan/scanForEnemyKingWithinOneSquare';
import { scanForKnightCheck } from 'base/features/game-board/utils/board-scan/scanForKnightCheck';
import { scanRank } from 'base/features/game-board/utils/board-scan/scanRank';
import { scanRankForCheck } from 'base/features/game-board/utils/board-scan/scanRankForCheck';

export function isKingInCheck(board: BoardState, currentKingIndex: number, color: PieceColor) {
  let isCheck = false;
  const opponentColor = color === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

  const scannedRank = scanRank(board, currentKingIndex);
  if (scanRankForCheck(scannedRank, opponentColor)) isCheck = true;

  const scannedFile = scanFile(board, currentKingIndex);
  if (scanFileForCheck(scannedFile, opponentColor)) isCheck = true;

  const scannedDiagonalA = scanDiagonal(board, currentKingIndex, true);
  const scannedDiagonalB = scanDiagonal(board, currentKingIndex, false);

  if (scanDiagonalForCheck(scannedDiagonalA, scannedDiagonalB, opponentColor)) isCheck = true;

  if (scanForKnightCheck(board, currentKingIndex, opponentColor)) isCheck = true;

  if (scanForEnemyKingWithinOneSquare(board, currentKingIndex)) isCheck = true;

  return isCheck;
}
