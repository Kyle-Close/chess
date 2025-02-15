import { BoardState } from 'base/data/getInitialBoardState';
import { PieceColor, PieceType } from 'base/features/game-board/hooks/usePiece';
import { getRemainingPiecesByColor } from '../piece-management/getRemainingPiecesByColor';

export function getTotalMaterialValue(board: BoardState, color: PieceColor) {
  const remainingPieces = getRemainingPiecesByColor(board, color);
  return remainingPieces.reduce((accumulator, currentPiece) => {
    return accumulator + getPieceValue(currentPiece.type);
  }, 0);
}

function getPieceValue(type: PieceType) {
  switch (type) {
    case PieceType.PAWN:
      return 1;
    case PieceType.BISHOP:
      return 3;
    case PieceType.KNIGHT:
      return 3;
    case PieceType.ROOK:
      return 5;
    case PieceType.QUEEN:
      return 9;
    case PieceType.KING:
      return 0;
  }
}
