import { BoardState, Piece } from "base/data/getInitialBoardState";

export function assignPieceToSquare(board: BoardState, piece: Piece, squareIndex: number) {
  board[squareIndex].piece = piece;
}
