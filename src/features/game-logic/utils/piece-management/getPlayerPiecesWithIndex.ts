import { BoardState } from "base/data/getInitialBoardState";
import { PieceColor } from "base/features/game-board/hooks/usePiece";
import { PieceWithIndex } from "../game-checks/isCheckmate";

export function getPlayerPiecesWithIndex(board: BoardState, color: PieceColor) {
  const opponentPieces: PieceWithIndex[] = [];

  board.forEach((square, index) => {
    const piece = square.piece;
    if (!piece) return;
    else if (piece.color === color) opponentPieces.push({ ...piece, index });
  });

  return opponentPieces;
}
