import { BoardState } from '../../context/board/InitialState';

export function deepCopyBoard(board: BoardState) {
  const newBoard: BoardState = JSON.parse(JSON.stringify(board));
  return newBoard;
}
