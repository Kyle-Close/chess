import { Piece } from '../context/board/InitialState';
import { PieceType } from '../enums/PieceType';
import { combineArrays } from './generic/CombineArrays';
import { PawnMoveValidation } from './pieces/pawn/moveValidation';

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
