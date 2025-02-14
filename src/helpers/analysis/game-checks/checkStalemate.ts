import { BoardState } from "base/context/board/InitialState";
import { PieceColor } from "base/features/game-board/hooks/usePiece";
import { calculateAllValidMoves } from "base/helpers/game-core/move-execution/calculateAllValidMoves";
import { getRemainingPiecesByColor } from "base/helpers/game-core/piece-management/getRemainingPiecesByColor";
import { CastleRights } from "base/redux/slices/castleRights";

export function checkStalemate(
  board: BoardState,
  isInCheck: boolean,
  color: PieceColor,
  castleRights: CastleRights,
  enPassantSquare: number | null
) {
  const pieces = getRemainingPiecesByColor(board, color, true);
  const isMoveAvailable = pieces.some((piece) => {
    const pieceAvailableMoves = calculateAllValidMoves(
      board,
      piece,
      piece.index,
      castleRights,
      enPassantSquare
    );
    if (!pieceAvailableMoves || pieceAvailableMoves.length === 0) return false;
    return true;
  });

  if (!isMoveAvailable && !isInCheck) return true;
  return false;
}
