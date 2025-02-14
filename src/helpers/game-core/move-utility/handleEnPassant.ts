import { buildEnPassantForFen } from "base/helpers/notation-setup/fen-management/buildEnPassantForFen";
import { getEnPassantCapturedPieceIndex } from "../board-utility/getEnPassantCapturedPieceIndex";
import { isPawnAdvancingTwoSquares } from "../move-execution/isPawnAdvancingTwoSquares";
import { PieceType } from "base/features/game-board/hooks/usePiece";
import { MoveMetaData } from "../move-execution/buildMoveMetaData";

export function handleEnPassant(moveMetaData: MoveMetaData): boolean {
  const { piece, startPosition, endPosition } = moveMetaData;

  if (piece.type === PieceType.PAWN && isPawnAdvancingTwoSquares(startPosition, endPosition)) {
    const enPassantSquareIndex = getEnPassantCapturedPieceIndex(endPosition, piece.color);
    moveMetaData.enPassantNotation = buildEnPassantForFen(enPassantSquareIndex);
    moveMetaData.enPassantSquare = enPassantSquareIndex;
    return true;
  } else {
    return false;
  }
}
