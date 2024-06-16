import { BoardState } from '../../context/board/InitialState';
import { PieceColor } from '../../enums/PieceColor';
import { PieceWithIndex } from '../game-mechanics/isCheckmate';

export function getAllPlayerPiecesWithIndex(board: BoardState, color: PieceColor) {
  const opponentPieces: PieceWithIndex[] = [];

  board.forEach((square, index) => {
    const piece = square.piece;
    if (!piece) return;
    else if (piece.color === color) opponentPieces.push({ ...piece, index });
  });

  return opponentPieces;
}
