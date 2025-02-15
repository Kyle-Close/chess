import { BoardState } from 'base/data/getInitialBoardState';
import { PieceType } from 'base/features/game-board/hooks/usePiece';
import { getSquareFile } from '../board-utility/getSquareFile';

export function scanForEnemyKingWithinOneSquare(board: BoardState, kingIndex: number) {
  const surroundingSquares = getSurroundingSquares(kingIndex);
  const filteredOutOfBounds = surroundingSquares.filter((square) => square >= 0 && square <= 63);
  return filteredOutOfBounds.some((square) => board[square].piece?.type === PieceType.KING);
}

function getSurroundingSquares(currentIndex: number) {
  const result: number[] = [];
  const file = getSquareFile(currentIndex);

  if (file !== 'a') {
    result.push(currentIndex + 7);
    result.push(currentIndex - 1);
    result.push(currentIndex - 9);
  }
  if (file !== 'h') {
    result.push(currentIndex - 7);
    result.push(currentIndex + 1);
    result.push(currentIndex + 9);
  }

  result.push(currentIndex - 8);
  result.push(currentIndex + 8);

  return result;
}
