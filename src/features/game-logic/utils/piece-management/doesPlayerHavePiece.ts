import { Piece } from "base/data/getInitialBoardState";
import { PieceType } from "base/features/game-board/hooks/usePiece";

export function doesPlayerHavePiece(playerRemainingPieces: Piece[], pieceTypeToCheck: PieceType) {
  return playerRemainingPieces.some((piece) => piece.type === pieceTypeToCheck);
}
