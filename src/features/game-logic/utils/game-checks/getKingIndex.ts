import { BoardState } from "base/data/getInitialBoardState";
import { PieceColor, PieceType } from "base/features/game-board/hooks/usePiece";

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
