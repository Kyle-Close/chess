import { BoardState, Piece, Square } from '../../context/board/InitialState';
import { filterCheckMoves } from '../validations/filterCheckMoves';
import {
  ValidSquares,
  kingMoveValidation,
} from '../validations/pieces/kingMoveValidation';
import { validatePieceMove } from '../validations/validatePieceMove';

export interface PieceWithIndex extends Piece {
  index: number;
}

export function isCheckmate(
  board: BoardState,
  kingPiece: Piece,
  currentIndex: number,
  remainingPlayerPieces: PieceWithIndex[]
) {
  // This should only be called if the player is already in check
  // Check if the king has any valid squares to move to.

  // Check if any piece is able to block the check
  //  get list of pieces still on the board for player
  //  for each piece get a list of valid moves
  //  remove any list that does not have a valid move
  //  for each list, loop through and execute the move, check if still in check
  let isCheckmate = false;

  let kingMoves = kingMoveValidation(board, kingPiece, currentIndex);
  kingMoves = filterCheckMoves(kingMoves, board, kingPiece, currentIndex);
  if (kingMoves.length === 0) isCheckmate = true;

  const canBlock = remainingPlayerPieces.some((piece) => {
    const pieceMoves = validatePieceMove(board, piece, piece.index);
    if (pieceMoves && pieceMoves.length > 0) return true;
    else return false;
  });

  if (canBlock) isCheckmate = false;

  return isCheckmate;
}
