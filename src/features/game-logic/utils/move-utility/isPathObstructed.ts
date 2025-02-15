import { BoardState } from "base/data/getInitialBoardState";

export function isPathObstructed(board: BoardState, squaresAlongPath: number[]) {
  // Only care about spaces between.
  return squaresAlongPath.some((square, index) => {
    if (index === 0 || index === squaresAlongPath.length - 1) return false;
    if (board[square].piece !== null) return true;
    else return false;
  });
}
