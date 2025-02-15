import { BoardState } from "base/data/getInitialBoardState";
import { PieceColor } from "base/features/game-board/hooks/usePiece";
import { scanAttackingSquares } from "base/features/game-board/utils/board-scan/scanAttackingSquares";

export function isSquaresAttacked(board: BoardState, pathSquares: number[], color: PieceColor) {
  // Checks if any of the passed in squares are being attacked by opponent
  const opponentColor = color === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;
  const attackedIndexes = scanAttackingSquares(board, opponentColor);

  return pathSquares.some((square) => attackedIndexes.includes(square));
}
