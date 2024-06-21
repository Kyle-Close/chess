import { BoardState, Piece } from '../../../context/board/InitialState';
import { GameState } from '../../../context/game-state/GameState';
import { calculateAllValidMoves } from './calculateAllValidMoves';

export function isMoveValid(
  board: BoardState,
  gameState: GameState,
  piece: Piece,
  startPos: number,
  endPos: number
) {
  const validMoves = calculateAllValidMoves(board, piece, startPos, gameState);
  if (!validMoves || validMoves.length === 0) return false;
  if (!validMoves.some((move) => move.index === endPos)) return false;
  return true;
}
