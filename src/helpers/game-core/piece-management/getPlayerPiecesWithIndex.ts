import { BoardState } from '../../../context/board/InitialState';
import { PieceColor } from '../../../enums/PieceColor';
import { PieceWithIndex } from '../../analysis/game-checks/isCheckmate';

export function getPlayerPiecesWithIndex(board: BoardState, color: PieceColor) {
  const opponentPieces: PieceWithIndex[] = [];

  board.forEach((square, index) => {
    const piece = square.piece;
    if (!piece) return;
    else if (piece.color === color) opponentPieces.push({ ...piece, index });
  });

  return opponentPieces;
}
