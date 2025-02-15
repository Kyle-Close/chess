import { isPawnAdvancingTwoSquares } from "../move-execution/isPawnAdvancingTwoSquares";
import { PieceType } from "base/features/game-board/hooks/usePiece";
import { MoveMetaData } from "../move-execution/buildMoveMetaData";
import { getEnPassantCapturedPieceIndex } from "base/features/game-board/utils/board-utility/getEnPassantCapturedPieceIndex";
import { buildEnPassantForFen } from "../fen/buildEnPassantForFen";

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
