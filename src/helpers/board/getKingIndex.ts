import { BoardState } from '../../context/board/InitialState';
import { PieceColor } from '../../enums/PieceColor';
import { PieceType } from '../../enums/PieceType';

export function getKingIndex(board: BoardState, pieceColor: PieceColor) {
  if (pieceColor === PieceColor.WHITE)
    return board.findIndex((square) => {
      return (
        square.piece?.type === PieceType.KING && square.piece.color === PieceColor.WHITE
      );
    });
  else
    return board.findIndex((square) => {
      return (
        square.piece?.type === PieceType.KING && square.piece.color === PieceColor.BLACK
      );
    });
}
