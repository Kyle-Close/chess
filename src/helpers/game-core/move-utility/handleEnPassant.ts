import { PieceType } from '../../../enums/PieceType';
import { buildEnPassantForFen } from '../../notation-setup/fen-management/buildEnPassantForFen';
import { getEnPassantCapturedPieceIndex } from '../board-utility/getEnPassantCapturedPieceIndex';
import { MoveMetaData } from '../move-execution/buildMoveMetaData';
import { isPawnAdvancingTwoSquares } from '../move-execution/isPawnAdvancingTwoSquares';

export function handleEnPassant(moveMetaData: MoveMetaData): boolean {
  const { piece, startPosition, endPosition } = moveMetaData;

  if (piece.type === PieceType.PAWN && isPawnAdvancingTwoSquares(startPosition, endPosition)) {
    const enPassantSquareIndex = getEnPassantCapturedPieceIndex(endPosition, piece.color);
    moveMetaData.enPassantNotation = buildEnPassantForFen(enPassantSquareIndex);
    return true;
  } else {
    return false;
  }
}
