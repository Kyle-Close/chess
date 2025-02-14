import { PieceColor, PieceType } from "base/features/game-board/hooks/usePiece";
import { getPawnAttackingIndexes } from "../game-checks/getPawnAttackingIndexes";
import { getStandardPieceMoves } from "base/helpers/game-core/move-execution/getStandardPieceMoves";
import { getPlayerPiecesWithIndex } from "base/helpers/game-core/piece-management/getPlayerPiecesWithIndex";
import { BoardState } from "base/context/board/InitialState";

export function scanAttackingSquares(board: BoardState, color: PieceColor) {
  // Returns an array of indexes that are being attacked.
  // An attacked square is a square your opponent can capture on if you had a piece there

  const piecesWithIndex = getPlayerPiecesWithIndex(board, color);
  const attackingIndexes: number[] = [];

  piecesWithIndex.forEach((piece) => {
    const validMoves = getStandardPieceMoves(board, piece, piece.index);

    if (piece.type !== PieceType.PAWN && validMoves) {
      validMoves.forEach((move) => {
        attackingIndexes.push(move.index);
      });
    } else {
      const pawnAttackingIndexes = getPawnAttackingIndexes(piece.index, color);

      pawnAttackingIndexes.forEach((index) => {
        attackingIndexes.push(index);
      });
    }
  });

  return [...new Set(attackingIndexes)];
}
