import { BoardState } from '../../context/board/InitialState';
import { PieceColor } from '../../enums/PieceColor';
import { PieceType } from '../../enums/PieceType';
import { getAllPlayerPiecesWithIndex } from '../piece-management/getAllPlayerPiecesWithIndex';
import { getPawnAttackingIndexes } from '../piece-management/getPawnAttackingIndexes';
import { validatePieceMove } from '../move/validation/validatePieceMove';

export function scanAttackingSquares(board: BoardState, color: PieceColor) {
  // Returns an array of indexes that are being attacked.
  // An attacked square is a square your opponent can capture on if you had a piece there

  const piecesWithIndex = getAllPlayerPiecesWithIndex(board, color);
  const attackingIndexes: number[] = [];

  piecesWithIndex.forEach((piece) => {
    const validMoves = validatePieceMove(board, piece, piece.index);

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
