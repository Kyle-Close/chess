import { BoardState } from "base/data/getInitialBoardState";
import { deepCopyBoard } from "base/features/game-board/utils/board-utility/deepCopyBoard";

export function executeMove(board: BoardState, startPos: number, endPos: number, useCopy = false) {
  const newBoard = useCopy ? deepCopyBoard(board) : board;

  const startSquare = newBoard[startPos];
  const endSquare = newBoard[endPos];

  if (startSquare.piece === null) throw Error('Cannot execute move on start square without piece.');

  startSquare.piece.hasMoved = true;

  endSquare.isCapture = false;
  endSquare.isValidMove = false;
  endSquare.piece = board[startPos].piece;

  startSquare.isCapture = false;
  startSquare.isValidMove = false;
  startSquare.piece = null;

  if (useCopy) return newBoard;
}
