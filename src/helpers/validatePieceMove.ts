import { Piece } from '../context/board/InitialState';
import { PieceType } from '../enums/PieceType';
import { PawnMoveValidation } from './pieces/pawn/moveValidation';
import { combineArrays } from './generic/combineArrays';

export function validatePieceMove(piece: Piece, currentIndex: number) {
  if (piece === null) return;
  let validMoves: number[] = [];

  if (piece.type === PieceType.PAWN) {
    validMoves = combineArrays(
      validMoves,
      PawnMoveValidation(piece, currentIndex)
    );
    console.log('valid pawn moves: ', validMoves);
  }

  return validMoves;
}
