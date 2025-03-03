import { BoardState } from 'base/data/getInitialBoardState';
import { PieceColor, PieceType } from 'base/features/game-board/hooks/usePiece';
import { getRemainingPiecesByColor } from '../piece-management/getRemainingPiecesByColor';

export function checkInsufficientMaterial(board: BoardState) {
  const remainingWhitePieces = getRemainingPiecesByColor(board, PieceColor.WHITE);
  const remainingBlackPieces = getRemainingPiecesByColor(board, PieceColor.BLACK);

  const whitePiecesLen = remainingWhitePieces.length;
  const blackPiecesLen = remainingBlackPieces.length;

  const whiteHasBishop = remainingWhitePieces.some((piece) => piece.type === PieceType.BISHOP);
  const blackHasBishop = remainingBlackPieces.some((piece) => piece.type === PieceType.BISHOP);

  const whiteHasKnight = remainingWhitePieces.some((piece) => piece.type === PieceType.KNIGHT);
  const blackHasKnight = remainingBlackPieces.some((piece) => piece.type === PieceType.KNIGHT);

  // Condition #1: Lone kings
  if (whitePiecesLen === 1 && blackPiecesLen === 1) return true;

  // Condition #2: King & bishop
  if (whitePiecesLen === 2 && whiteHasBishop && blackPiecesLen === 2 && blackHasBishop) return true;

  // Condition #3: King & knight
  if (whitePiecesLen === 2 && whiteHasKnight && blackPiecesLen === 2 && blackHasKnight) return true;

  return false;
}
