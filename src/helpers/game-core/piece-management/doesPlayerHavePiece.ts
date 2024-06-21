import { Piece } from '../../../context/board/InitialState';
import { PieceType } from '../../../enums/PieceType';

export function doesPlayerHavePiece(playerRemainingPieces: Piece[], pieceTypeToCheck: PieceType) {
  return playerRemainingPieces.some((piece) => piece.type === pieceTypeToCheck);
}
