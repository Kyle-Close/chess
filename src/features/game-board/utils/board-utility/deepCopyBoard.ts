import { BoardState } from "base/data/getInitialBoardState";

export function deepCopyBoard(board: BoardState) {
  const newBoard: BoardState = JSON.parse(JSON.stringify(board));
  return newBoard;
}
