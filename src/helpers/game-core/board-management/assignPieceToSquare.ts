import { BoardState, Piece } from '../../../context/board/InitialState';

export function assignPieceToSquare(
  board: BoardState,
  piece: Piece,
  squareIndex: number
) {
  console.log(piece);
  board[squareIndex].piece = piece;
}
