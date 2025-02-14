import { BoardState, Piece } from "base/context/board/InitialState";

export function assignPieceToSquare(board: BoardState, piece: Piece, squareIndex: number) {
  board[squareIndex].piece = piece;
}
