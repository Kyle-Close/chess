import { BoardState } from '../../context/board/InitialState';
import { PieceColor } from '../../enums/PieceColor';
import { PieceType } from '../../enums/PieceType';
import { getRemainingPiecesByColor } from '../game-core/piece-management/getRemainingPiecesByColor';

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
