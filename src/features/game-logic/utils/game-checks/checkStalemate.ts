import { BoardState } from "base/data/getInitialBoardState";
import { PieceColor } from "base/features/game-board/hooks/usePiece";
import { CastleRights } from "base/redux/slices/castleRights";
import { getRemainingPiecesByColor } from "../piece-management/getRemainingPiecesByColor";
import { calculateAllValidMoves } from "../move-execution/calculateAllValidMoves";

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
